import { createApi } from "unsplash-js";
import config from "../../../src/config";

const unsplash = createApi({
    accessKey: config.unsplash_access_key as string,
});

export async function getImageNow() {
    try {
        const photos = await unsplash.search.getPhotos({
            query: "house",
            page: 1,
            perPage: 10,
            orientation: "landscape"
        });

        return photos;
    } catch (error) {
        console.error(error);
    }
}
