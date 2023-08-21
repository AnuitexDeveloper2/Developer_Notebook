import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { ref, listAll, getDownloadURL } from "firebase/storage"
import { Topic } from "../types/content";

export const addImagesToTopicItem = async (topicItems: Array<Topic>) => {
    const images = await getImages()
    return topicItems.reduce((agg, item) => {
        if (typeof item.img === 'string') {
            const index = images.findIndex((i) => i.includes(item.img as string))
            if (index !== -1) {
                item.imgSrc = images[index]
            }
        }
        agg.push(item)
        return agg
    }, Array<Topic>())
}

const getImages = async () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBevEl2-TaGmFOf0c__X-PACCCqm7XhYvs",
        authDomain: "notebook-3f0bd.firebaseapp.com",
        projectId: "notebook-3f0bd",
        storageBucket: "notebook-3f0bd.appspot.com",
        messagingSenderId: "330793725031",
        appId: "1:330793725031:web:b860dbfc6ba5d9ef5db8c2",
        measurementId: "G-B74RVBP4RQ"
    };
    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    const storageRef = ref(storage);
    const result = await listAll(storageRef);
    const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
    return Promise.all(urlPromises)
}
