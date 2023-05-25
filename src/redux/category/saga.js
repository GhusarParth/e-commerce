import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-hot-toast";
import { CREATE_CATEGORY, GET_ALL_CATEGORY } from "./category.type";
import { GET, POST } from "../../services/methods";
import { fetchLoading, getAllCategory } from "./category.reducer";

function* addCategory(req) {
  try {
    yield put(fetchLoading(true));
    const res = yield call(POST, "/category", req.payload);
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    yield put(fetchLoading(false));
  }
}
function* getAllCategories() {
  try {
    const res = yield call(GET, "/category");
    yield put(getAllCategory(res.data));
  } catch (error) {
    console.log("get all category failed: ", error);
  }
}

function* categorySaga() {
  yield takeEvery(CREATE_CATEGORY, addCategory);
  yield takeEvery(GET_ALL_CATEGORY, getAllCategories);
}

export default categorySaga;
