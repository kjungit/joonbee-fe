import { instance } from '../axios';

const getToken = async () => {
  const res = await instance().get('/token');
  return res;
};

const getRefresh = async () => {
  try {
    const res = await instance().get('/auth/login/refresh');
    return res;
  } catch (error: any) {
    const errorCode = error.response.data;
    throw errorCode;
  }
};

const kakaoLogin = async (code: string) => {
  try {
    const res = await instance().get(`/auth/kakao/callback?code=${code}`);
    return res;
  } catch (error: any) {
    const errorCode = error.response.data;
    throw errorCode;
  }
};
const naverLogin = async (code: string) => {
  try {
    const res = await instance().get(`/auth/naver/callback?code=${code}`);
    return res;
  } catch (error: any) {
    const errorCode = error.response.data;
    throw errorCode;
  }
};
const googleLogin = async (code: string) => {
  try {
    const res = await instance().get(`/auth/google/callback?code=${code}`);
    return res;
  } catch (error: any) {
    const errorCode = error.response.data;
    throw errorCode;
  }
};

export interface PostNickNameProps {
  id: string;
  nickName: string;
}

const postNickName = async ({ id, nickName }: PostNickNameProps) => {
  try {
    const res = await instance().post('/auth/login/nick', { id, nickName });
    return res;
  } catch (error: any) {
    const errorCode = error.request.status;
    throw errorCode;
  }
};

const getLogout = async () => {
  const res = await instance().get('/auth/login/logout');
};

const authApis = {
  getToken,
  getRefresh,
  kakaoLogin,
  naverLogin,
  googleLogin,
  postNickName,
  getLogout,
};

export default authApis;
