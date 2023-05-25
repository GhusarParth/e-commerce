import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-hot-toast";
import { FORM_DATA_POST, GET, POST } from "../../services/methods";
import {
  fetchLoading,
  fileUploadLoading,
  getAllProducts,
  storeProductImages,
} from "./product.reducer";
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCT,
  UPLOAD_PRODUCT_IMAGE,
} from "./product.type";

function* addProduct(req) {
  try {
    yield put(fetchLoading(true));
    const res = yield call(POST, "/product", req.payload);
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    yield put(fetchLoading(false));
  }
}

function* uploadProductImage(req) {
  try {
    let productData = new FormData();
    for (const file of req.files) {
      console.log("file", file);
      productData.append("file", file);
    }
    yield put(fileUploadLoading(true));
    const res = yield call(FORM_DATA_POST, "/product/imageUpload", productData);
    console.log("res", res);
    yield put(storeProductImages(res.data));
  } catch (error) {
    console.log("error", error);
    toast.error(error.data.message);
  } finally {
    yield put(fileUploadLoading(false));
  }
}

function* getProducts() {
  try {
    const res = yield call(GET, "/product");
    yield put(getAllProducts(res.data));
  } catch (error) {
    console.log("get all category failed: ", error);
  }
}

function* productSaga() {
  yield takeEvery(CREATE_PRODUCT, addProduct);
  yield takeEvery(GET_ALL_PRODUCT, getProducts);
  yield takeEvery(UPLOAD_PRODUCT_IMAGE, uploadProductImage);
}

export default productSaga;
