import profileReducer, {addPostActionCreator, deletePost} from './profileReducer';
import React from 'react';

let state = {
    posts: [
        {id: 1, message: 'Hi, it is me', likeCount: 5},
        {id: 2, message: 'It is my first post here', likeCount: 60},
        {id: 3, message: 'It is my second post here', likeCount: 200}
    ]};

it('lengths of post should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("I'm 5th post");
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
   expect(newState.posts.length).toBe(4);
});

it('message of new post should be add', () => {
    // 1. test data
    let action = addPostActionCreator("I'm 5th post");
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts[3].message).toBe("I'm 5th post");
});

it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1);
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(2);
});
it('after deleting length of messages should not be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(100000);
    //2. action
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(3);
});
