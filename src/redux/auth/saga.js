import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-hot-toast";
import {
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  USER_LOGIN,
  USER_REGISTER,
} from "./auth.type";
import { POST } from "../../services/methods";
import { getLoginDetail, fetchLoading } from "./auth.reducer";

function* fetchLogin(req) {
  try {
    yield put(fetchLoading(true));
    const res = yield call(POST, "/auth/login", req.payload);
    localStorage.setItem("accessToken", res.data.token);
    yield put(getLoginDetail(res.data));
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    yield put(fetchLoading(false));
  }
}

function* registerUser(req) {
  try {
    yield put(fetchLoading(true));
    const res = yield call(POST, "/auth/register", req.payload);
    toast.success(res.data.message);
    req.navigate.replace("/login");
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    yield put(fetchLoading(false));
  }
}

function* resetPassword(req) {
  try {
    yield put(fetchLoading(true));
    const res = yield call(POST, "/auth/sent-reset-password", req.payload);
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    yield put(fetchLoading(false));
  }
}

function* changePassword(req) {
  try {
    yield put(fetchLoading(true));
    const res = yield call(
      POST,
      `auth/resetPassword/${req.id}/${req.token}`,
      req.payload
    );
    toast.success(res.data.message);
    req.navigate.push("/");
  } catch (error) {
    toast.error(error.data.message);
  } finally {
    yield put(fetchLoading(false));
  }
}

function* authSaga() {
  yield takeEvery(USER_LOGIN, fetchLogin);
  yield takeEvery(USER_REGISTER, registerUser);
  yield takeEvery(RESET_PASSWORD, resetPassword);
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export default authSaga;
