import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { List } from 'react-content-loader';
import AuthService from 'services';
import swal from 'sweetalert';
//countUp

const Dashboard = (props) => {
 
    const [sending, setSending] = useState(false);
    const [data, setData] = useState({});

    // get data
    let isMounted = true;
    async function getData() {
        try{
            setSending(true);
            await props.dispatch(AuthService.dashboardCount()).then((res) => {
                if(isMounted){
                    setSending(false);
                    setData(res.body);
                }
            });
        }catch(err) {
            setSending(false);
            console.log(err);
            if(err && err.data && err.data.message){
                swal("Oops!", err.data.message, "error");
            }
        }
    };

    useEffect(() => {
        getData();
         return () => {
             isMounted = false;
         };
     }, []);
 

    return(
        <>
            <Helmet title="Dashboard" />
            <div className="app-title">
                <div>
                <h1><i className="fa fa-dashboard"></i> Dashboard</h1>
                </div>
                <ul className="app-breadcrumb breadcrumb">
                <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
             
                </ul>
            </div>
            {sending &&
                <List  
                    style={{ width: '100%', padding: 10, }} 
                    speed={2}
                    height={150}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#c1c5c7"
                    viewBox="0 0 380 50"
                />
            } 

            {!sending && data &&
                <div className="row">
           
                    <div className="col-md-6 col-lg-3">
                        <Link >
                            <div className="widget-small primary coloured-icon"><i className="icon fa fa-users fa-3x"></i>
                                <div className="info">
                                    <h4>Users</h4>
                                    <p><b>{data.userCount}</b></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth,
    }
};

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);