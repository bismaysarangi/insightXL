import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I analyze multiple files simultaneously?",
    answer:
      "Yes, our platform supports simultaneous analysis of multiple Excel files, allowing users to compare and visualize datasets together.",
  },
  {
    question: "What is InsightXL AI?",
    answer:
      "Powerdrill AI is a smart data analysis assistant that uses machine learning to offer insights, summaries, and recommendations from your uploaded Excel data.",
  },
  {
    question: "How can I use InsightXL AI?",
    answer:
      "Upload your Excel file and enable AI insights to receive intelligent summaries and graph suggestions based on your data.",
  },
  {
    question: "How does AI work?",
    answer:
      "It processes your Excel files using pre-trained models to extract key trends, generate summaries, and suggest data visualizations.",
  },
  {
    question: "Can I analyze spreadsheets with multiple tabs?",
    answer:
      "Yes, our parser reads multi-tab Excel sheets. You can select which sheet to analyze during the upload.",
  },
  {
    question: "InsightXL AI have a privacy notice?",
    answer:
      "Absolutely. We respect your data privacy. All uploaded files are encrypted and never shared. Please read our Privacy Policy for full details.",
  },
  {
    question:
      "How can I get in touch with you for questions or to share feedback?",
    answer:
      "You can contact us via the support form on the dashboard or email us at support@powerdrill.ai.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-700 pb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center justify-between px-4">
              <h3 className="text-md md:text-lg font-medium">{faq.question}</h3>
              <ChevronDown
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-400 text-base md:text-lg">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
