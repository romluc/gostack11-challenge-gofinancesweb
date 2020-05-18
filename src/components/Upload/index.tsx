import React, { ReactNode } from 'react';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: Function;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return <UploadMessage>Choose a file or drag it here</UploadMessage>;
    }

    if (isDragRejest) {
      return (
        <UploadMessage type="error">File format not supported</UploadMessage>
      );
    }

    return <UploadMessage type="success">Drop the file here</UploadMessage>;
  }

  return (
    <>
      <Dropzone
        accept=".csv, application/vnd.ms-excel, text/csv"
        onDropAccepted={files => onUpload(files)}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} data-testid="upload" />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
