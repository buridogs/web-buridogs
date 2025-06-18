import { render, screen } from "@testing-library/react";
import { Banner } from "./Banner";

describe("Banner", () => {
    it("should render without crashing", () => {
        render(<Banner />);
        expect(screen.getByText("Conheça nossos parceiros")).toBeInTheDocument();
    });
});
