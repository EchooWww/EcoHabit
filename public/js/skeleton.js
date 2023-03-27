function loadSkeleton() {
  console.log($('#headerPlaceholder').load('/header'));
  console.log($('#navbarPlaceholder').load('/nav'));
  console.log($('#nonActiveNavbarPlaceholder').load('/nonactive-nav'));
}
loadSkeleton();