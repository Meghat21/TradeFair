export const permissionsListRoleBase = [
  {
    role: "superAdmin",
    allowedPermissions: [
      "VIEW_SHOPS",
      "CREATE_SHOP",
      "UPDATE_SHOP",
      "DELETE_SHOP",
      "CREATE_USERS",
      "VIEW_USERS",
      "UPDATE_USERS",
      "DELETE_USERS",
      "MANAGE_SALES",
    ],
  },
  {
    role: "admin",
    allowedPermissions: [
      "VIEW_SHOPS",
      "CREATE_SHOP",
      "UPDATE_SHOP",
      "DELETE_SHOP",
    ],
  },
  {
    role: "vendor",
    allowedPermissions: [
      "VIEW_SHOPS",
      "CREATE_SHOP",
      "UPDATE_SHOP",
      "DELETE_SHOP",
    ],
  },
];

// res.status(200).json({
//   ...data,
//   ...permissionsListRoleBase[0],
// });

// res.status(200).json({
//   ...data,
//   ...permissionsListRoleBase[0],
// });

// res.status(200).json({
//   ...data,
//   ...permissionsListRoleBase[0],
// });

// App.js

// const { data } =

// const { all } = data;

// <Route />
// <Route /><Route /><Route /><Route />
