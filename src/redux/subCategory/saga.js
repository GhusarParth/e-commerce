import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-hot-toast";
import { GET, POST } from "../../services/methods";
import { CREATE_SUB_CATEGORY, GET_ALL_SUB_CATEGORY } from "./subCategory.type";
import { fetchLoading, getAllSubCategory } from "./subCategory.reducer";

function* addSubCategory(req) {
  try {
    yield put(fetchLoading(true));
    const res = yield call(POST, "/subCategory", req.payload);
    toast.success(res.data.message);
    req.setOpenDrawer(false);
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    yield put(fetchLoading(false));
  }
}

function* getAllSubCategories() {
  try {
    const res = yield call(GET, "/subCategory");
    yield put(getAllSubCategory(res.data));
  } catch (error) {
    console.log("get all category failed: ", error);
  }
}

function* subCategorySaga() {
  yield takeEvery(CREATE_SUB_CATEGORY, addSubCategory);
  yield takeEvery(GET_ALL_SUB_CATEGORY, getAllSubCategories);
}

export default subCategorySaga;
