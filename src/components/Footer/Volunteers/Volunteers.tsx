import { VolunteersCardWrapper } from "./VolunteersCardWrapper";

export function Volunteers() {
    return (
        <div className="max-h-[60vh] overflow-y-auto bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex flex-col items-center">
                <h2 className="text-grey-400 text-2xl font-semibold text-center">
                    Voluntários e contribuidores
                </h2>
                <VolunteersCardWrapper />
            </div>
        </div>
    );
}
