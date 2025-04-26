import { useState, useCallback, useEffect } from "react";

import { toast } from "react-toastify";
import { ApiError } from "@/services/api/core/base-service-api";
import { volunteerService } from "@/services/api/modules/users/users-service";
import {
    CreateVolunteerDto,
    IVolunteer,
    UpdateVolunteerDto,
} from "@/services/api/modules/users/types";

type RequestStatus = "idle" | "loading" | "success" | "error";

export const useVolunteers = () => {
    const [volunteers, setVolunteers] = useState<IVolunteer[]>([]);
    const [status, setStatus] = useState<RequestStatus>("idle");
    const [error, setError] = useState<string | null>(null);

    // Function to fetch all volunteers
    const fetchVolunteers = useCallback(async () => {
        setStatus("loading");
        setError(null);

        try {
            const data = await volunteerService.getVolunteers();
            setVolunteers(data);
            setStatus("success");
        } catch (err) {
            setStatus("error");
            const message = err instanceof ApiError ? err.message : "Failed to fetch volunteers";
            setError(message);
            toast.error(message);
        }
    }, [toast]);

    // Function to get a single volunteer by ID
    const getVolunteerById = useCallback(
        async (id: string) => {
            setStatus("loading");
            setError(null);

            try {
                const volunteer = await volunteerService.getVolunteerById(id);
                setStatus("success");
                return volunteer;
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError
                        ? err.message
                        : `Failed to fetch volunteer with ID ${id}`;
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        [toast]
    );

    // Function to create a volunteer
    const createVolunteer = useCallback(
        async (data: CreateVolunteerDto) => {
            setStatus("loading");
            setError(null);

            try {
                const newVolunteer = await volunteerService.createVolunteer(data);
                setVolunteers((prev) => [...prev, newVolunteer]);
                setStatus("success");
                toast.success("Volunteer created successfully");
                return newVolunteer;
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError ? err.message : "Failed to create volunteer";
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        [toast]
    );

    // Function to update a volunteer
    const updateVolunteer = useCallback(
        async (id: string, data: UpdateVolunteerDto) => {
            setStatus("loading");
            setError(null);

            try {
                const updatedVolunteer = await volunteerService.updateVolunteer(id, data);
                setVolunteers((prev) =>
                    prev.map((volunteer) => (volunteer.id === id ? updatedVolunteer : volunteer))
                );
                setStatus("success");
                toast.success("Volunteer updated successfully");
                return updatedVolunteer;
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError
                        ? err.message
                        : `Failed to update volunteer with ID ${id}`;
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        [toast]
    );

    // Function to delete a volunteer
    const deleteVolunteer = useCallback(
        async (id: string) => {
            setStatus("loading");
            setError(null);

            try {
                await volunteerService.deleteVolunteer(id);
                setVolunteers((prev) => prev.filter((volunteer) => volunteer.id !== id));
                setStatus("success");
                toast.success("Volunteer deleted successfully");
            } catch (err) {
                setStatus("error");
                const message =
                    err instanceof ApiError
                        ? err.message
                        : `Failed to delete volunteer with ID ${id}`;
                setError(message);
                toast.error(message);
                throw err;
            }
        },
        [toast]
    );

    // Load volunteers when the component mounts
    useEffect(() => {
        fetchVolunteers();
    }, [fetchVolunteers]);

    return {
        volunteers,
        isLoading: status === "loading",
        isError: status === "error",
        error,
        fetchVolunteers,
        getVolunteerById,
        createVolunteer,
        updateVolunteer,
        deleteVolunteer,
    };
};
