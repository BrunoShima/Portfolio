import AboutHero from "./AboutHero";
import AboutOutro from "./AboutOutro";
import AboutBody from "./AboutBody";
import TechMarquee from "../../components/ui/TechMarquee";

export default function AboutScreen() {

    return (
        <main>
            <AboutHero/>
            <TechMarquee/>
            <AboutBody/>
            <AboutOutro/>
        </main>

    );

}