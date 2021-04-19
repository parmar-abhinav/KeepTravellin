import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        usertype: response.usertype
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}


export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('usertype', response.usertype)
                localStorage.setItem('creds', JSON.stringify(creds));
                // Dispatch the success action
                // dispatch(fetchProfile(creds.username));
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('usertype')
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const fetchProfile = (username) => (dispatch) => {
    dispatch(profileLoading());
    return fetch(baseUrl + `profile/${username}`)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addProfile(dishes)))
        .catch(error => dispatch(profileFailed(error.message)));
}

export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING
});

export const profileFailed = (errmess) => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: errmess
});

export const addProfile = (profile) => ({
    type: ActionTypes.ADD_PROFILE,
    payload: profile
});



export const fetchStories = () => (dispatch) => {
    dispatch(storiesLoading(true));

    return fetch(baseUrl + 'stories')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(stories => dispatch(addStories(stories)))
        .catch(error => dispatch(storiesFailed(error.message)));
}

export const storiesLoading = () => ({
    type: ActionTypes.STORIES_LOADING
});

export const storiesFailed = (errmess) => ({
    type: ActionTypes.STORIES_FAILED,
    payload: errmess
});

export const addStories = (stories) => ({
    type: ActionTypes.ADD_STORIES,
    payload: stories
});



export const fetchDestination = () => (dispatch) => {
    dispatch(destinationLoading(true));

    return fetch(baseUrl + 'destination')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDestination(dishes)))
        .catch(error => dispatch(destinationFailed(error.message)));
}

export const destinationLoading = () => ({
    type: ActionTypes.DESTINATION_LOADING
});

export const destinationFailed = (errmess) => ({
    type: ActionTypes.DESTINATION_FAILED,
    payload: errmess
});

export const addDestination = (profile) => ({
    type: ActionTypes.ADD_DESTINATION,
    payload: profile
});

export const registerUser = (details) => (dispatch) => {

    dispatch(registrationLoading());

    return fetch(baseUrl + 'users/signup', {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addRegistration(response)))
        .catch(error => dispatch(registrationFailed(error.message)));
}



export const registrationLoading = () => ({
    type: ActionTypes.REGISTRATION_LOADING
});

export const registrationFailed = (errmess) => ({
    type: ActionTypes.REGISTRATION_FAILED,
    payload: errmess
});

export const addRegistration = (response) => ({
    type: ActionTypes.ADD_REGISTRATION,
    payload: response
});




export const addServices = (details) => (dispatch) => {

    dispatch(servicesLoading());

    return fetch(baseUrl + 'services', {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addService(response)))
        .catch(error => dispatch(servicesFailed(error.message)));
}


export const servicesLoading = () => ({
    type: ActionTypes.SERVICES_LOADING
});

export const servicesFailed = (errmess) => ({
    type: ActionTypes.SERVICES_FAILED,
    payload: errmess
});

export const addService = (response) => ({
    type: ActionTypes.ADD_SERVICES,
    payload: response
});





export const fetchFacilities = () => (dispatch) => {
    dispatch(facilityLoading(true));

    return fetch(baseUrl + 'services')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(stories => dispatch(addFacility(stories)))
        .catch(error => dispatch(facilityFailed(error.message)));
}

export const deleteService = (id) => (dispatch) => {
    dispatch(facilityLoading());

    return fetch(baseUrl + `services/${id}`)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => dispatch(fetchFacilities()))
        .catch(error => dispatch(facilityFailed(error.message)));
}


export const facilityLoading = () => ({
    type: ActionTypes.FACILITY_LOADING
});

export const facilityFailed = (errmess) => ({
    type: ActionTypes.FACILITY_FAILED,
    payload: errmess
});

export const addFacility = (stories) => ({
    type: ActionTypes.ADD_FACILITY,
    payload: stories
});



export const updateProfile = (details) => (dispatch) => {

    dispatch(updateProfileLoading());

    return fetch(baseUrl + 'profile', {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addUpdateProfile(response)))
        .catch(error => dispatch(updateProfileFailed(error.message)));
}



export const updateProfileLoading = () => ({
    type: ActionTypes.UPROFILE_LOADING
});

export const updateProfileFailed = (errmess) => ({
    type: ActionTypes.UPROFILE_FAILED,
    payload: errmess
});

export const addUpdateProfile = (response) => ({
    type: ActionTypes.ADD_UPROFILE,
    payload: response
});



export const fetchTrip = () => (dispatch) => {
    dispatch(tripLoading());

    return fetch(baseUrl + 'trip')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(stories => dispatch(addTrip(stories)))
        .catch(error => dispatch(tripFailed(error.message)));
}

export const tripLoading = () => ({
    type: ActionTypes.TRIP_LOADING
});

export const tripFailed = (errmess) => ({
    type: ActionTypes.TRIP_FAILED,
    payload: errmess
});

export const addTrip = (stories) => ({
    type: ActionTypes.ADD_TRIP,
    payload: stories
});


export const addRequests = (details) => (dispatch) => {

    dispatch(requestLoading());

    return fetch(baseUrl + 'request', {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addRequest(response)))
        .catch(error => dispatch(requestFailed(error.message)));
}



export const requestLoading = () => ({
    type: ActionTypes.REQUEST_LOADING
});

export const requestFailed = (errmess) => ({
    type: ActionTypes.REQUEST_FAILED,
    payload: errmess
});

export const addRequest = (response) => ({
    type: ActionTypes.ADD_REQUEST,
    payload: response
});


export const deleteUser = (id) => (dispatch) => {
    dispatch(userLoading());

    return fetch(baseUrl + `checkusers/${id}`)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(stories => dispatch(fetchUser()))
        .catch(error => dispatch(userFailed(error.message)));
}


export const fetchUser = () => (dispatch) => {
    dispatch(userLoading());

    return fetch(baseUrl + 'checkusers')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(stories => dispatch(addUser(stories)))
        .catch(error => dispatch(userFailed(error.message)));
}

export const userLoading = () => ({
    type: ActionTypes.USER_LOADING
});

export const userFailed = (errmess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errmess
});

export const addUser = (stories) => ({
    type: ActionTypes.ADD_USER,
    payload: stories
});


export const addStory = (details) => (dispatch) => {

    dispatch(storyLoading());

    return fetch(baseUrl + 'stories', {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addStry(response)))
        .catch(error => dispatch(storyFailed(error.message)));
}



export const storyLoading = () => ({
    type: ActionTypes.STORY_LOADING
});

export const storyFailed = (errmess) => ({
    type: ActionTypes.STORY_FAILED,
    payload: errmess
});

export const addStry = (response) => ({
    type: ActionTypes.ADD_STORY,
    payload: response
});



export const fetchWish = () => (dispatch) => {
    dispatch(wishLoading());

    return fetch(baseUrl + 'wish')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(stories => dispatch(addWish(stories)))
        .catch(error => dispatch(wishFailed(error.message)));
}

export const joinWish = (details) => (dispatch) => {

    return fetch(baseUrl + 'wish', {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .catch(error => console.log(error));
}


export const removeWish = (details) => (dispatch) => {

    return fetch(baseUrl + `wish/${details._id}`)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(res => dispatch(fetchWish()))
        .catch(error => console.log(error));
}

export const wishLoading = () => ({
    type: ActionTypes.WISH_LOADING
});

export const wishFailed = (errmess) => ({
    type: ActionTypes.WISH_FAILED,
    payload: errmess
});

export const addWish = (stories) => ({
    type: ActionTypes.ADD_WISH,
    payload: stories
});

// export const postFavorite = (dishId) => (dispatch) => {

//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'favorites/' + dishId, {
//         method: "POST",
//         body: JSON.stringify({"_id": dishId}),
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization': bearer
//         },
//         credentials: "same-origin"
//     })
//     .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//       error => {
//             throw error;
//       })
//     .then(response => response.json())
//     .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
//     .catch(error => dispatch(favoritesFailed(error.message)));
// }

// export const deleteFavorite = (dishId) => (dispatch) => {

//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'favorites/' + dishId, {
//         method: "DELETE",
//         headers: {
//           'Authorization': bearer
//         },
//         credentials: "same-origin"
//     })
//     .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//       error => {
//             throw error;
//       })
//     .then(response => response.json())
//     .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
//     .catch(error => dispatch(favoritesFailed(error.message)));
// };

// export const fetchFavorites = () => (dispatch) => {
//     dispatch(favoritesLoading(true));

//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'favorites', {
//         headers: {
//             'Authorization': bearer
//         },
//     })
//     .then(response => {
//         if (response.ok) {
//             return response;
//         }
//         else {
//             var error = new Error('Error ' + response.status + ': ' + response.statusText);
//             error.response = response;
//             throw error;
//         }
//     },
//     error => {
//         var errmess = new Error(error.message);
//         throw errmess;
//     })
//     .then(response => response.json())
//     .then(favorites => dispatch(addFavorites(favorites)))
//     .catch(error => dispatch(favoritesFailed(error.message)));
// }

// export const favoritesLoading = () => ({
//     type: ActionTypes.FAVORITES_LOADING
// });

// export const favoritesFailed = (errmess) => ({
//     type: ActionTypes.FAVORITES_FAILED,
//     payload: errmess
// });

// export const addFavorites = (favorites) => ({
//     type: ActionTypes.ADD_FAVORITES,
//     payload: favorites
// });

// export const fetchLeaders = () => (dispatch) => {

//     dispatch(leadersLoading());

//     return fetch(baseUrl + 'leaders')
//     .then(response => {
//         if (response.ok) {
//             return response;
//         } else {
//             var error = new Error('Error ' + response.status + ': ' + response.statusText);
//             error.response = response;
//             throw error;
//         }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
//     .then(response => response.json())
//     .then(leaders => dispatch(addLeaders(leaders)))
//     .catch(error => dispatch(leadersFailed(error.message)));
// }

// export const leadersLoading = () => ({
//     type: ActionTypes.LEADERS_LOADING
// });

// export const leadersFailed = (errmess) => ({
//     type: ActionTypes.LEADERS_FAILED,
//     payload: errmess
// });

// export const addLeaders = (leaders) => ({
//     type: ActionTypes.ADD_LEADERS,
//     payload: leaders
// });

// export const postFeedback = (feedback) => (dispatch) => {

//     return fetch(baseUrl + 'feedback', {
//         method: "POST",
//         body: JSON.stringify(feedback),
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
//     })
//     .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//       error => {
//             throw error;
//       })
//     .then(response => response.json())
//     .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
//     .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
// };

// export const addComment = (comment) => ({
//     type: ActionTypes.ADD_COMMENT,
//     payload: comment
// });

// export const postComment = (dishId, rating, comment) => (dispatch) => {

//     const newComment = {
//         dish: dishId,
//         rating: rating,
//         comment: comment
//     }
//     console.log('Comment ', newComment);

//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'comments', {
//         method: 'POST',
//         body: JSON.stringify(newComment),
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': bearer
//         },
//         credentials: 'same-origin'
//     })
//     .then(response => {
//         if (response.ok) {
//             return response;
//         }
//         else {
//             var error = new Error('Error ' + response.status + ': ' + response.statusText);
//             error.response = response;
//             throw error;
//         }
//     },
//     error => {
//         var errmess = new Error(error.message);
//         throw errmess;
//     })
//     .then(response => response.json())
//     .then(response => dispatch(addComment(response)))
//     .catch(error => { console.log('Post comments ', error.message);
//         alert('Your comment could not be posted\nError: '+ error.message); })
// }



// export const fetchComments = () => (dispatch) => {
//     return fetch(baseUrl + 'comments')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
//         .then(response => response.json())
//         .then(comments => dispatch(addComments(comments)))
//         .catch(error => dispatch(commentsFailed(error.message)));
// }

// export const commentsFailed = (errmess) => ({
//     type: ActionTypes.COMMENTS_FAILED,
//     payload: errmess
// });

// export const addComments = (comments) => ({
//     type: ActionTypes.ADD_COMMENTS,
//     payload: comments
// });

// export const fetchPromos = () => (dispatch) => {
//     dispatch(promosLoading(true));

//     return fetch(baseUrl + 'promotions')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             }
//             else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
//         .then(response => response.json())
//         .then(promos => dispatch(addPromos(promos)))
//         .catch(error => dispatch(promosFailed(error.message)));
// }

// export const promosLoading = () => ({
//     type: ActionTypes.PROMOS_LOADING
// });

// export const promosFailed = (errmess) => ({
//     type: ActionTypes.PROMOS_FAILED,
//     payload: errmess
// });

// export const addPromos = (promos) => ({
//     type: ActionTypes.ADD_PROMOS,
//     payload: promos
// });