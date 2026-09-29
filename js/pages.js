document.addEventListener("DOMContentLoaded", () => {

    const pages = Array.from(
        document.querySelectorAll("[data-page]")
    );

    const buttons = Array.from(
        document.querySelectorAll("[data-page-target]")
    );


    if (pages.length === 0) {
        return;
    }


    function showPage(name) {

        const selectedPage = pages.find(
            (page) => page.dataset.page === name
        );


        if (!selectedPage) {
            return;
        }


        pages.forEach((page) => {

            page.hidden =
                page !== selectedPage;

        });


        buttons.forEach((button) => {

            const selected =
                button.dataset.pageTarget === name;


            button.classList.toggle(
                "active",
                selected
            );


            if (selected) {

                button.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                button.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                showPage(
                    button.dataset.pageTarget
                );

            }
        );

    });


    const requestedPage =
        window.location.hash.slice(1);


    const initialPage =
        pages.some(
            (page) =>
                page.dataset.page === requestedPage
        )
            ? requestedPage
            : pages[0].dataset.page;


    showPage(initialPage);

});