import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import DropzoneField, { UploadedFile } from "..";
import { ResourceType } from "../../../../types/utils/ResourceType";

describe("DropzoneField", () => {
  test("should render and drop + with upload error", async () => {
    const TestComponent = () => {
      const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
      return (
        <DropzoneField
          label="Image"
          helperText="Helper text"
          displayOptionalLabel
          maxFiles={1}
          acceptedFileTypes={["image/png"]}
          fileUploads={fileUploads}
          setFileUploads={setFileUploads}
          resourceType={ResourceType.POST}
        >
          Hello
        </DropzoneField>
      );
    };
    render(<TestComponent />);

    // drop file
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputElement = screen.getByLabelText("Image-label");
    const file = new File(["file"], "image.png");
    Object.defineProperty(inputElement, "files", {
      value: [file],
    });
    fireEvent.drop(inputElement);

    // label + children
    const children = screen.getByText("Hello");
    const label = screen.getByText("Image");
    const helperText = screen.getByText("Helper text");
    const optional = screen.getByText("optional");
    expect(children).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(helperText).toBeInTheDocument();
    expect(optional).toBeInTheDocument();

    // loading
    const loading = await screen.findByText("Loading...");
    expect(loading).toBeInTheDocument();

    // error
    const error = await screen.findByText(
      "There was an error with your image.png upload"
    );
    const inputDiv = await screen.findByLabelText("Image-div");
    expect(inputDiv).toHaveStyle("border-color: #ef4444;");
    expect(error).toBeInTheDocument();

    // file details
    const uploads = screen.queryByText("Uploads");
    const fileName = screen.queryByText("image.png");
    const viewButton = screen.queryByLabelText("image.png-open");
    const deleteButton = screen.queryByRole("button", {
      name: "image.png-remove",
    });
    expect(uploads).not.toBeInTheDocument();
    expect(fileName).not.toBeInTheDocument();
    expect(viewButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  test("should render and drop multiple files + with upload error", async () => {
    const TestComponent = () => {
      const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
      return (
        <DropzoneField
          ariaLabel="Image"
          fileUploads={fileUploads}
          setFileUploads={setFileUploads}
          resourceType={ResourceType.POST}
        >
          Hello
        </DropzoneField>
      );
    };
    render(<TestComponent />);

    // drop files
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputElement = screen.getByLabelText("Image-label");
    const fileOne = new File(["file"], "image.png");
    const fileTwo = new File(["file"], "pdf.pdf");
    Object.defineProperty(inputElement, "files", {
      value: [fileOne, fileTwo],
    });
    fireEvent.drop(inputElement);

    // label + children
    const children = screen.getByText("Hello");
    const label = screen.queryByText("Image");
    const optional = screen.queryByText("optional");
    expect(children).toBeInTheDocument();
    expect(label).not.toBeInTheDocument();
    expect(optional).not.toBeInTheDocument();

    // loading
    const loading = await screen.findByText("Loading...");
    expect(loading).toBeInTheDocument();

    // error
    const error = await screen.findByText(
      "There was an error with your pdf.pdf upload"
    );
    const inputDiv = await screen.findByLabelText("Image-div");
    expect(inputDiv).toHaveStyle("border-color: #ef4444;");
    expect(error).toBeInTheDocument();

    // file details
    const uploads = screen.queryByText("Uploads");
    const fileNameOne = screen.queryByText("image.png");
    const fileNameTwo = screen.queryByText("pdf.pdf");
    const viewButtonOne = screen.queryByLabelText("image.png-open");
    const deleteButtonOne = screen.queryByRole("button", {
      name: "image.png-remove",
    });
    const viewButtonTwo = screen.queryByRole("pdf.pdf-open");
    const deleteButtonTwo = screen.queryByRole("button", {
      name: "pdf.pdf-remove",
    });
    expect(uploads).not.toBeInTheDocument();
    expect(fileNameOne).not.toBeInTheDocument();
    expect(fileNameTwo).not.toBeInTheDocument();
    expect(viewButtonOne).not.toBeInTheDocument();
    expect(deleteButtonOne).not.toBeInTheDocument();
    expect(viewButtonTwo).not.toBeInTheDocument();
    expect(deleteButtonTwo).not.toBeInTheDocument();
  });

  test("should render and obey maxFiles", async () => {
    const TestComponent = () => {
      const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
      return (
        <DropzoneField
          ariaLabel="Image"
          maxFiles={1}
          fileUploads={fileUploads}
          setFileUploads={setFileUploads}
          resourceType={ResourceType.POST}
        >
          Hello
        </DropzoneField>
      );
    };
    render(<TestComponent />);

    // drop files
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputElement = screen.getByLabelText("Image-label");
    const fileOne = new File(["file"], "image.png");
    const fileTwo = new File(["file"], "pdf.pdf");
    Object.defineProperty(inputElement, "files", {
      value: [fileOne, fileTwo],
    });
    fireEvent.drop(inputElement);

    // file details
    const fileNameOne = screen.queryByText("image.png");
    const fileNameTwo = screen.queryByText("pdf.pdf");
    const viewButtonOne = screen.queryByRole("button", {
      name: "image.png-open",
    });
    const deleteButtonOne = screen.queryByRole("button", {
      name: "image.png-remove",
    });
    const viewButtonTwo = screen.queryByRole("button", {
      name: "pdf.pdf-open",
    });
    const deleteButtonTwo = screen.queryByRole("button", {
      name: "pdf.pdf-remove",
    });
    expect(fileNameOne).not.toBeInTheDocument();
    expect(fileNameTwo).not.toBeInTheDocument();
    expect(viewButtonOne).not.toBeInTheDocument();
    expect(deleteButtonOne).not.toBeInTheDocument();
    expect(viewButtonTwo).not.toBeInTheDocument();
    expect(deleteButtonTwo).not.toBeInTheDocument();

    // error
    const error = await screen.findByText("error", { exact: false });
    const inputDiv = await screen.findByLabelText("Image-div");
    expect(inputDiv).toHaveStyle("border-color: #ef4444;");
    expect(error).toBeInTheDocument();
  });

  test("should render and obey maxSize", async () => {
    const TestComponent = () => {
      const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
      return (
        <DropzoneField
          ariaLabel="Image"
          maxSize={1}
          fileUploads={fileUploads}
          setFileUploads={setFileUploads}
          resourceType={ResourceType.POST}
        >
          Hello
        </DropzoneField>
      );
    };
    render(<TestComponent />);

    // drop file
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputElement = screen.getByLabelText("Image-label");
    const file = new File(["file"], "image.png");
    Object.defineProperty(inputElement, "files", {
      value: [file],
    });
    fireEvent.drop(inputElement);

    // error
    const error = await screen.findByText("error", { exact: false });
    const inputDiv = await screen.findByLabelText("Image-div");
    expect(inputDiv).toHaveStyle("border-color: #ef4444;");
    expect(error).toBeInTheDocument();
  });

  test("should render and obey accepted file types", async () => {
    const TestComponent = () => {
      const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
      return (
        <DropzoneField
          ariaLabel="Image"
          acceptedFileTypes={["image/png"]}
          fileUploads={fileUploads}
          setFileUploads={setFileUploads}
          resourceType={ResourceType.POST}
        >
          Hello
        </DropzoneField>
      );
    };
    render(<TestComponent />);

    // drop file
    window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
    const inputElement = screen.getByLabelText("Image-label");
    const file = new File(["file"], "pdf.pdf");
    Object.defineProperty(inputElement, "files", {
      value: [file],
    });
    fireEvent.drop(inputElement);

    // file details
    const fileName = screen.queryByText("pdf.pdf");
    const viewButton = screen.queryByRole("button", { name: "image.png-open" });
    const deleteButton = screen.queryByRole("button", {
      name: "image.png-remove",
    });
    expect(fileName).not.toBeInTheDocument();
    expect(viewButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();

    // error
    const error = await screen.findByText("error", { exact: false });
    const inputDiv = await screen.findByLabelText("Image-div");
    expect(inputDiv).toHaveStyle("border-color: #ef4444;");
    expect(error).toBeInTheDocument();
  });
});
