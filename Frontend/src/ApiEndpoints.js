
//const baseUrl = "https://gym-backend-thesuyogshukla.vercel.app/api/v1/"

 const baseUrl = "http://localhost:4000/api/v1/"

 const superAdmin = baseUrl+"superadmin/"

 const admin= baseUrl+"admin/"

 const urlSuperAdminLogin = superAdmin+"login"

 const urlAddGym = superAdmin+"gyms/add"

const urlGetAllGyms=superAdmin+"gyms/all"

const urlUpdateGym=superAdmin+"gym"

const urlGetGymById=superAdmin+"gym"

const urlDeleteGymById=superAdmin+"gym"

const urlAdminLogin= admin+"login" 

const urlAddCustomerAdmin= admin+"customer/add"

const urlGetAllCustomersAdmin= admin+"customers/all"

const urlGetCustomerById=admin+"customer"

const urlDeleteCustomerById=admin+"customer"

const urlUpdateCustomer=admin+"customer"

const urlAddTrainer=admin+"trainer/add"

const urlGetAllTrainers=admin+"trainers/all"

const urlDeleteTrainerById=admin+"trainer"

const urlGetGymDetailsAdmin = admin+"gym"

const urlUpdateSubscriptionDetails = admin+"subscription"

export {
    urlSuperAdminLogin,
    urlAddGym,
    urlGetAllGyms,
    urlUpdateGym  ,
    urlGetGymById  ,
    urlDeleteGymById,
    urlAdminLogin,
    urlAddCustomerAdmin,
    urlGetAllCustomersAdmin,
    urlGetCustomerById,
    urlDeleteCustomerById,
    urlUpdateCustomer,
    urlAddTrainer,
    urlGetAllTrainers,
    urlDeleteTrainerById,
    urlGetGymDetailsAdmin,
    urlUpdateSubscriptionDetails
};