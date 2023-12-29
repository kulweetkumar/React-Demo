import * as Path from './paths';

//-----------------------auth--------------------//
import SignIn from 'components/views/admin/auth/Login';
import SignUp from 'components/views/admin/auth/Register';

//------------Dashboard--------------------------//
import Dashboard from 'components/views/admin/dashboard/Dashboard';

//------------Profile--------------------------//
import Profile from 'components/views/admin/profile/Profile';
import User from 'components/views/admin/user/index';
import CreateUser from 'components/views/admin/user/create';
import ViewUser from 'components/views/admin/user/UserView';
import EditUser from 'components/views/admin/user/edit';
import Category from 'components/views/admin/category/index';
import Chat from 'components/views/admin/chat/index';


import NotFound from 'components/NotFound';

const routes = [  
	{
		path: Path.login,
		exact: true,
		auth: false,
		fallback: true,
		component: SignIn,
	},
	{
		path: Path.Signup,
		exact: true,
		auth: false,
		fallback: true,
		component: SignUp,
	},
	/* dashboard routes */
	{
		path: Path.Dashboard,
		exact: true,
		auth: true,
		component: Dashboard,
	},
	/* profile routes */
	{
		path: Path.Profile,
		exact: true,
		auth: true,
		component: Profile,
	},
	/* users related route */
	{
		path: Path.User,
		exact: true,
		auth: true,
		component: User,
	},
	{
		path: Path.UserAdd,
		exact: true,
		auth: true,
		component: CreateUser,
	},
	{
		path: Path.UserView,
		exact: true,
		auth: true,
		component: ViewUser,
	},
	{
		path: Path.user_view,
		exact: true,
		auth: true,
		component: ViewUser,
	},
	{
		path: Path.userDelete,
		exact: true,
		auth: true,
		component: ViewUser,
	},
	{
		path: Path.user_delete,
		exact: true,
		auth: true,
		component: User,
	},

	{
		path: Path.UserEdit,
		exact: true,
		auth: true,
		component: EditUser,
	},
	{
		path: Path.User_edit,
		exact: true,
		auth: true,
		component: EditUser,
	},
	// category module start here 
	{
		path: Path.Category,
		exact: true,
		auth: true,
		component: Category,
	},
	{
		path: Path.UserAdd,
		exact: true,
		auth: true,
		component: CreateUser,
	},
	{
		path: Path.UserView,
		exact: true,
		auth: true,
		component: ViewUser,
	},
	{
		path: Path.user_view,
		exact: true,
		auth: true,
		component: ViewUser,
	},
	{
		path: Path.userDelete,
		exact: true,
		auth: true,
		component: ViewUser,
	},
	{
		path: Path.user_delete,
		exact: true,
		auth: true,
		component: User,
	},

	{
		path: Path.UserEdit,
		exact: true,
		auth: true,
		component: EditUser,
	},
	{
		path: Path.User_edit,
		exact: true,
		auth: true,
		component: EditUser,
	},
	
	// chat module start here 
	{
		path: Path.Chat,
		exact: true,
		auth: true,
		component: Chat,
	},
	/* setting routes */
	{
		path: '/',
		exact: false,
		component: NotFound,
	},

];

export default routes;
