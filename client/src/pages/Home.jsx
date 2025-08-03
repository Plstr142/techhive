import ContentCarousel from "../components/home/ContentCarousel"
import BestSeller from "../components/home/BestSeller"

const Home = () => {
    return (
        <div>
            <ContentCarousel />

            <p className="text-2xl text-center my-4">Best seller</p>
            <BestSeller />
        </div>
    )
}
export default Home