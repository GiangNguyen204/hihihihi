import PersonCard from '@components/cards/PersonCard';
import { organizationData } from '@constants/home/organizationData';
import '@features/home/pages/Home.css';
import '@styles/home/SectionBCH.scss';

const SectionBCH = () => {
  return (
    <section className="py-6 sm:py-10 md:py-14 lg:py-16 px-2 sm:px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-center">
          <p className="section-title text-center text-blue-900 font-bold text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl px-2 sm:px-4">
            BAN CHẤP HÀNH LIÊN CHI ĐOÀN KHOA CÔNG NGHỆ THÔNG TIN
          </p>
        </div>

        <div className="w-full flex justify-center pt-6 sm:pt-8 md:pt-10 lg:pt-12">
          <div className="org-chart-container">
            <div className="org-chart-wrapper">
              <div
                className="org-chart relative"
                style={{ width: '800px', minHeight: 'fit-content' }}
              >
                <div className="flex justify-center mb-8 relative pt-2">
                  <PersonCard member={organizationData.secretary} />
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-10 mb-8 px-6">
                  {organizationData.viceSecretaries.map((viceSecretary) => (
                    <div key={viceSecretary.id} className="flex justify-center">
                      <PersonCard member={viceSecretary} />
                    </div>
                  ))}
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-10 px-6">
                  {organizationData.viceSecretaries.map((viceSecretary) => (
                    <div key={`member-${viceSecretary.member.id}`} className="flex justify-center">
                      <PersonCard member={viceSecretary.member} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBCH;
