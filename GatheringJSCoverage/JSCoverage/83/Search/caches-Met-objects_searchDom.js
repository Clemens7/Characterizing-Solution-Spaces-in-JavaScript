import * as DomHelper from "../domHelpers.js";

export function loadElements(container, searchObjects) {
    container.innerHTML = "";
    for (let searchObject of searchObjects) {
        container.appendChild(
            DomHelper.container([
                    DomHelper.container(
                        [
                            DomHelper.element(
                                "img",
                                {
                                    src: searchObject.primaryImage,
                                    alt: searchObject.title,
                                    id: `object-image-${searchObject.objectId}`
                                }
                            ),
                            DomHelper.container(
                                [
                                    DomHelper.text(
                                        "span",
                                        searchObject.artistDisplayName,
                                        {},
                                        ["artist"]
                                    ),
                                    DomHelper.text(
                                        "span",
                                        `${searchObject.title}, `,
                                        {},
                                        ["title"]
                                    ),
                                    DomHelper.text(
                                        "span",
                                        searchObject.objectDate,
                                        {},
                                        ["date"]
                                    )
                                ],
                                "div",
                                {},
                                ["museum-label"]
                            )
                        ],
                        "a",
                        {
                            id: `object-${searchObject.objectId}`,
                            href: searchObject.getConfigureHref()
                        }
                    )
                ],
                "div",
                {},
                ["thumb"]
            )
        );
    }
}
