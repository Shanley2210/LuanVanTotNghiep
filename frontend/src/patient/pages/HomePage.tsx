import DoctorHomapage from '../containers/DoctorHomapage';
import FAQ from '../containers/FAQ';
import InfoBanner from '../containers/InfoBanner';
import SearchBanner from '../containers/SearchBanner';
import SerivceHompage from '../containers/SerivceHompage';
import SpecialtyHomepage from '../containers/SpecialtyHomepage';
import WhyBanner from '../containers/WhyBanner';

export default function HomePage() {
    return (
        <>
            <SearchBanner />
            <InfoBanner />
            <SerivceHompage />
            <SpecialtyHomepage />
            <DoctorHomapage />
            <WhyBanner />
            <FAQ />
        </>
    );
}
