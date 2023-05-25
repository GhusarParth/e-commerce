import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import categorySaga from "./category/saga";
import subCategorySaga from "./subCategory/saga";
import productSaga from "./product/saga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(categorySaga),
    fork(subCategorySaga),
    fork(productSaga),
  ]);
}
