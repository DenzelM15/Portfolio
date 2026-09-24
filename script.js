// script.js

const root = document.documentElement;

/* =========================================================
   THEME TOGGLE
   ========================================================= */

const themeBtn = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

updateThemeIcon();

themeBtn?.addEventListener("click", () => {
  const current =
    root.getAttribute("data-theme") === "light"
      ? "dark"
      : "light";

  root.setAttribute("data-theme", current);

  localStorage.setItem("theme", current);

  updateThemeIcon();
});

function updateThemeIcon() {
  const theme =
    root.getAttribute("data-theme");

  themeBtn?.setAttribute(
    "aria-label",
    theme === "light"
      ? "Switch to dark theme"
      : "Switch to light theme"
  );
}

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const toggle =
  document.querySelector(".nav__toggle");

const menu =
  document.querySelector(".nav__menu");

toggle?.addEventListener("click", () => {
  const open =
    menu.classList.toggle("open");

  toggle.setAttribute(
    "aria-expanded",
    String(open)
  );

  toggle.setAttribute(
    "aria-label",
    open
      ? "Close menu"
      : "Open menu"
  );
});

menu
  ?.querySelectorAll(".nav__link")
  .forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    });
  });

/* =========================================================
   HERO GLOW
   ========================================================= */

const glow =
  document.querySelector(".glow");

document.addEventListener(
  "pointermove",
  event => {
    if (!glow) return;

    const x =
      (event.clientX / window.innerWidth) *
      100;

    const y =
      (event.clientY / window.innerHeight) *
      100;

    glow.style.setProperty(
      "--x",
      `${x}%`
    );

    glow.style.setProperty(
      "--y",
      `${y}%`
    );
  }
);

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const observer =
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "is-visible"
          );
        }
      });
    },
    {
      threshold: 0.12
    }
  );

document
  .querySelectorAll(".reveal")
  .forEach(element => {
    observer.observe(element);
  });

/* =========================================================
   COUNTERS
   ========================================================= */

function animateCount(element) {
  const end =
    Number(
      element.dataset.count || 0
    );

  const duration = 1100;

  const start =
    performance.now();

  function tick(now) {
    const progress =
      Math.min(
        (now - start) / duration,
        1
      );

    element.textContent =
      Math.floor(progress * end);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

document
  .querySelectorAll(".stat__num")
  .forEach(animateCount);

/* =========================================================
   PROJECT FILTERS
   ========================================================= */

const chips =
  document.querySelectorAll(".chip");

const cards =
  document.querySelectorAll(
    ".grid .card"
  );

chips.forEach(chip => {
  chip.addEventListener("click", () => {

    chips.forEach(item => {
      item.classList.remove("active");

      item.setAttribute(
        "aria-selected",
        "false"
      );
    });

    chip.classList.add("active");

    chip.setAttribute(
      "aria-selected",
      "true"
    );

    const filter =
      chip.dataset.filter;

    cards.forEach(card => {
      const show =
        filter === "all" ||
        card.dataset.cat === filter;

      card.style.display =
        show ? "" : "none";
    });
  });
});

/* =========================================================
   MODALS
   ========================================================= */

function openModal(selector) {
  const dialog =
    document.querySelector(selector);

  if (
    dialog &&
    typeof dialog.showModal === "function"
  ) {
    dialog.showModal();
  }
}

function closeModal(dialog) {
  if (dialog?.open) {
    dialog.close();
  }
}

document
  .querySelectorAll("[data-modal]")
  .forEach(button => {
    button.addEventListener(
      "click",
      () => {
        openModal(
          button.dataset.modal
        );
      }
    );
  });

document
  .querySelectorAll(".modal")
  .forEach(dialog => {

    dialog.addEventListener(
      "click",
      event => {
        if (event.target === dialog) {
          closeModal(dialog);
        }
      }
    );

    dialog
      .querySelector(".modal__close")
      ?.addEventListener(
        "click",
        () => {
          closeModal(dialog);
        }
      );
  });

document.addEventListener(
  "keydown",
  event => {
    if (event.key !== "Escape") {
      return;
    }

    document
      .querySelectorAll(".modal")
      .forEach(dialog => {
        if (dialog.open) {
          closeModal(dialog);
        }
      });
  }
);

/* =========================================================
   CONTACT FORM VALIDATION
   ========================================================= */

const form =
  document.querySelector(".form");

const note =
  document.querySelector(".form__note");

form?.addEventListener(
  "submit",
  event => {
    event.preventDefault();

    let valid = true;

    const name = form.name;

    const email = form.email;

    const message = form.message;

    clearError(name);

    clearError(email);

    clearError(message);

    if (!name.value.trim()) {
      setError(
        name,
        "Please enter your name."
      );

      valid = false;
    }

    if (
      !email.value.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      )
    ) {
      setError(
        email,
        "Please enter a valid email."
      );

      valid = false;
    }

    if (
      message.value.trim().length < 10
    ) {
      setError(
        message,
        "Message should be at least 10 characters."
      );

      valid = false;
    }

    if (!valid) {
      note.textContent =
        "Please fix the errors above.";

      return;
    }

    note.textContent =
      "Thanks! Your message was validated locally.";

    form.reset();
  }
);

function setError(input, message) {
  const wrapper =
    input.closest(".field");

  wrapper.querySelector(
    ".error"
  ).textContent = message;

  input.setAttribute(
    "aria-invalid",
    "true"
  );
}

function clearError(input) {
  const wrapper =
    input.closest(".field");

  wrapper.querySelector(
    ".error"
  ).textContent = "";

  input.removeAttribute(
    "aria-invalid"
  );
}

/* =========================================================
   FOOTER YEAR
   ========================================================= */

const year =
  document.getElementById("year");

if (year) {
  year.textContent =
    new Date().getFullYear();
}

/* =========================================================
   BACK TO TOP
   ========================================================= */

const toTop =
  document.querySelector(".to-top");

window.addEventListener(
  "scroll",
  () => {
    if (!toTop) return;

    toTop.style.opacity =
      window.scrollY > 600
        ? "1"
        : ".6";
  }
);