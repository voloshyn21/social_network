import {profileAPI, usersAPI} from '../api/api';

import {PhotosType, PostType, ProfileType} from '../types/types';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Hi, it is me', likeCount: 5},
        {id: 2, message: 'It is my first post here', likeCount: 60},
        {id: 3, message: 'It is my second post here', likeCount: 200}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    newPostText: ''
};

export type InitialStateType = typeof initialState;
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST :
            let newText = action.newPostText;
            return <InitialStateType>{
                ...state,
                posts: [...state.posts, {id: 4, message: newText}]
            };
        case SET_USER_PROFILE :
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS :
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST :
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        case SAVE_PHOTO_SUCCESS :
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as any
            };
        default:
            return state;
    }
};

type ActionsType = AddPostActionCreatorType | SetUserProfileType | SavePhotoSuccessType | DeletePost |
    SetUserStatus;
    type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
};
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
};
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
};
type DeletePost = {
    type: typeof DELETE_POST,
    postId: number
};
type SetUserStatus = {
    type: typeof SET_STATUS,
    status: string | null
};

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});
export const deletePost = (postId: number): DeletePost => ({type: DELETE_POST, postId});


export const setUserStatus = (status: string | null): SetUserStatus => ({type: SET_STATUS, status});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUserProfile = (userId: number):ThunkType => async (dispatch, getState) => {
    let data = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(data));
};
export const getUserStatus = (userId:number):ThunkType => async (dispatch,
                                                                  getState:any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(data));
};
export const updateUserStatus = (status: string):ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};
export const savePhoto = (file: any):ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile: ProfileType)=> async (dispatch: any, getState:any) => {
    //getState берётся из другого редьюсера (auth)
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        //для вывода общей ошибки пишу _error
        dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}));
        //для вывода ошибки по каждому полю контактов пишу"contacts":{"facebook" ...}
        //dispatch(stopSubmit("editProfile", {"contacts":{"facebook": response.data.messages[0]}}));
        return Promise.reject(response.data.messages[0]);
    }
};

export default profileReducer;
