
import {ADMIN_ROUTE,LOGIN_ROUTE , MEDICINE_ROUTE, ILLNES_ROUTE, FAMILY_ROUTE, MEDICINE_USAGE_ROUTE , STATISTICS_ROUTE , REGISTRATION_ROUTE} from "./utils/consts";

import Admin from "./pages/Admin";

import Auth from './pages/Auth'
import Medicines from './pages/Medicine'
import Illnesses from './pages/Illnes'
import FamilyMember from './pages/Family-members'
import MedicineUsage from './pages/Medicine-usage'
import Statistics from './pages/Statistics'


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]


export const publicRoutes  = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: FAMILY_ROUTE,
        Component: FamilyMember
    },
    {
        path: MEDICINE_USAGE_ROUTE,
        Component: MedicineUsage
    },
    {
        path: STATISTICS_ROUTE,
        Component: Statistics
    },
];