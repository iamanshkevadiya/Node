const isAdmin = (req, res, next) => { };

const isSuperAdmin = (req, res, next) => {
    try {
        if (req.user) {
            if (req.user?.role == "SUPERADMIN") {
                return next();
            }
            else {
                return res.status(403).json({ msg: "You dont have permission to access" });
            }
        }
    } catch (error) {
        res.status(403).json({ msg: "Unauthorized access error", message: error.message });
    }
};

module.exports = { isSuperAdmin };