import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './pages/contact/contact';
import { SingleListview } from './single-listview/single-listview';

export const routes: Routes = [
	{ path: '', component: Home },
	{ path: 'contact', component: Contact },
	{ path: 'singleview/:id', component: SingleListview },
];
