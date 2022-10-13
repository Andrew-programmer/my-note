import {
    ACCOUNT_ROUTE,
    AUTH_ROUTE,
    LIST_ROUTE,
    LISTS_ROUTE,
    NOT_FOUND,
    NOTE_ROUTE,
    NOTES_ROUTE,
    SETTINGS_ROUTE
} from "../utlis/consts";
import AuthPage from "../pages/AuthPage";
import ListsPage from "../pages/ListsPage";
import ListPage from "../pages/ListPage";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import AccountPage from "../pages/AccountPage";
import NotePage from "../pages/NotePage";
import NotesPage from "../pages/NotesPage";

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: AuthPage
    },
    {
        path: NOT_FOUND,
        Component: NotFound
    },
]

export const authRoutes = [
    {
        path: NOTES_ROUTE,
        Component: NotesPage
    },
    {
        path: LISTS_ROUTE,
        Component: ListsPage
    },
    {
        path: NOTE_ROUTE,
        Component: NotePage
    },
    {
        path: LIST_ROUTE,
        Component: ListPage
    },
    {
        path: SETTINGS_ROUTE,
        Component: Settings
    },
    {
        path: ACCOUNT_ROUTE,
        Component: AccountPage
    },
]
