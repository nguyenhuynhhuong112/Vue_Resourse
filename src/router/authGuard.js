export function authGuard(to, from, next) {
  const roleUser = localStorage.getItem("role") === "admin";
  const productUser = localStorage.getItem("role") === "product";

  if (to.matched.some((record) => record.meta.requiresAdmin) && !roleUser) {
    next({ path: "/noauthority" });
  } else if (
    to.matched.some((record) => record.meta.requiresProduct) &&
    !productUser
  ) {
    next({ path: "/noauthority" });
  } else {
    next();
  }
}
