export default {

    alert:{
        success:{
            UpdateProfile:"The profile has been updated.",
            ChangeWorkingLimit:"The working limit has been updated.",
            AddAccount:"The new account has been created.",
            AllocateShift:"The shift has been allocated. A notification has been sent to the staff.",
            CreateShift:"The shift has been created.",
            DeleteShift:"The shift has been deleted.",
            AcceptAllocation:"The allocation has been accepted. A notification has been sent to the manager.",
            AddFreeTime:"An available time has been added."
        },
        error: {
            Common:"Something is wrong",
            LargeWorkingLimit:"Working limit should be smaller than 120 hours.",
            UpdateWorkingLimit:"Current workload hours is greater than new working limit.",
            PasswordIsNotSameWithConfirmPassword:"Password is not same with confirmed password.",
            AddAccount:"Something is wrong. Cannot create a new account.",
            NoRoleWhenCreateAccount:"Please select a role",
            ErrorFreeTime:"Please select a correct end date and time",
            OverlapFreeTime:"Selected time interval may be overlap",
        }
    },
    confirm:{},
}