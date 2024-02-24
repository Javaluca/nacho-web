import { Routes } from '@angular/router';
import { BrowserComponent } from './pages/browser/browser.component';
import { IndexComponent } from './pages/index/index.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full' },
    {path: 'index', component: IndexComponent },
    {path: 'browse', component: BrowserComponent },
    {path: '**', component: PageNotFoundComponent },
];
