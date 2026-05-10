document.documentElement.classList.add("motion-ready");

const showToast = (message) => {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
};

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 1.9 } });
  }

  const page = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
    }
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  let count = Number(localStorage.getItem("novastoreCart") || "2");
  const updateCartCount = () => {
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = String(count);
    });
  };
  updateCartCount();

  document.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      count += 1;
      localStorage.setItem("novastoreCart", String(count));
      updateCartCount();
      showToast("Producto agregado al carrito de mockup.");
    });
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.toast));
  });

  document.querySelectorAll("form[data-mock-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast(form.dataset.success || "Solicitud recibida en este mockup.");
    });
  });
});
