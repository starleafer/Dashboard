import React from "react";
import { Dialog, Heading, Modal, ModalOverlay, Button } from "react-aria-components";
import CustomButton from "./CustomButton";

interface NewsModalProps {
  article?: {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    source: {
      name: string;
    };
  };
}

const NewsModal = ({ article }: NewsModalProps) => {
  return (
    <ModalOverlay className="fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur">
      <Modal className="w-full max-w-2xl overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl dark:bg-gray-800 bg-white">
        <Dialog className="outline-none relative">
          {({ close }) => (
            <>
              <Heading className="text-xl font-semibold text-primary mb-4">
                {article?.title}
              </Heading>
              <div className="relative h-[300px] mb-4">
                <img 
                  src={article?.urlToImage} 
                  alt={article?.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="mb-4 dark:text-white text-black">{article?.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Source: {article?.source.name}</span>
                <CustomButton variant="secondary" onPress={close}>
                  Close
                </CustomButton>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default NewsModal;
