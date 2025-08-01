import chatIcon from '../assets/img/icon-chat.png'
import moneyIcon from '../assets/img/icon-money.png'
import securityIcon from '../assets/img/icon-security.png'
import HeroSection from '../components/HeroSection'
import FeatureItem from '../components/FeatureItem'

function Home() {
  return (
    <main>
      <HeroSection />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureItem icon={chatIcon} title="You are our #1 priority">
          Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
        </FeatureItem>
        <FeatureItem icon={moneyIcon} title="More savings means higher rates">
          The more you save with us, the higher your interest rate will be!
        </FeatureItem>
        <FeatureItem icon={securityIcon} title="Security you can trust">
          We use top of the line encryption to make sure your data and money is always safe.
        </FeatureItem>
      </section>
    </main>
  )
}

export default Home
