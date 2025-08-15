// middleware/checkAdmin.js
export function checkAdmin(req, res, next) {
    try {
      const user = req.user; // assuming JWT decoded user is set by auth middleware
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
  