import React from "react";
import { connect } from 'react-redux';
import { useHistory} from 'react-router-dom';
import env from 'env.json';

const Sidebar = ({user, userProfile}) => {

    //history
    const history = useHistory();

    const pathname = history.location.pathname.split('/');
 
 
    const filtered = pathname.filter(function (el) {
        if(el !== ""){
            return el;
        }
    });
     
    let path = '/';
 
    if(filtered.length>=2){
         path += filtered[0]+"/"+filtered[1];
    }
    else {
        path += filtered[0] ?? '';
    }
    return(
        <>
        <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
        <aside className="app-sidebar">
            <div className="app-sidebar__user">
                <img className="app-sidebar__user-avatar profile-img" src={userProfile && userProfile.image && userProfile.image.original ? env.SERVER_URL+userProfile.image.original : user && user.user && user.user.image &&  user.user.image.original ? env.SERVER_URL+user.user.image.original  : '/assets/images/dummy.png'} alt="User Image" />
                <div>
                 <p className="app-sidebar__user-name">{userProfile ? userProfile.first_name  : user && user.user ? user.user.first_name : ''}</p>
                </div>
            </div>
          
        </aside>
        </>
    )
}

const mapStateToPros = (state, props) => {
    return{
        isAuthenticated: state.Auth.isAuthenticated,
        loader: state.persistStore.loader,
        userProfile: state.persistStore.editSetting,
        user: state.Auth,
    }
};

export default connect(
  mapStateToPros,
)(Sidebar);
