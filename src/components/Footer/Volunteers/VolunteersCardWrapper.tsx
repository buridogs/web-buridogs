import { volunteersWithHisSection } from "@/mock/volunteersMock";
import { VolunteersCard } from "./VolunteersCard";
import { VolunteerSituationEnum } from "@/interfaces/volunteersInterfaces";

export function VolunteersCardWrapper() {
    return (
        <div className="w-[80%] md:w-full mt-3 flex flex-col items-center">
            {volunteersWithHisSection.map((volunteerSection) =>
                volunteerSection.situation === VolunteerSituationEnum.origin ? (
                    <VolunteersCard
                        key={volunteerSection.volunteers[0].name}
                        volunteer={volunteerSection.volunteers[0]}
                    />
                ) : (
                    <div
                        key={volunteerSection.situationDescription}
                        className="w-full flex flex-col items-center md:items-start mt-4"
                    >
                        <p className="text-gray-500 text-sm text-center">
                            {volunteerSection.situationDescription}
                        </p>
                        <div className="w-full flex justify-center md:justify-start gap-2 flex-wrap mt-2 pb-3">
                            {volunteerSection.volunteers.map((volunteer) => (
                                <VolunteersCard
                                    key={volunteer.name}
                                    volunteer={volunteer}
                                    isContributor
                                />
                            ))}
                        </div>
                        <div className="w-3/4 h-1 m-[0_auto] border-b border-gray-300" />
                    </div>
                )
            )}
        </div>
    );
}
