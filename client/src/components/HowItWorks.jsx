
export default function HowItWorks() {
    const steps = [
      {
        step: "1",
        title: "Upload Your Excel Files",
        description:
          "Easily upload your Excel file containing the data you want to visualize. InsightXL supports multiple file formats.",
      },
      {
        step: "2",
        title: "Select Your Graph Type",
        description:
          "Choose the type of graph you need—bar, line, or pie chart, and specify the data range. InsightXL will automatically create the desired chart based on your input.",
      },
      {
        step: "3",
        title: "Download Your Graph",
        description:
          "Once InsightXL processes the data, you can instantly download the generated graph, ready for use in reports, presentations, or further analysis.",
      },
    ];
  
    return (
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">How it works</h2>
  
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="w-15 h-15 flex items-center justify-center mx-auto mb-4 bg-gray-900 rounded-full text-blue-400 font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-5x1 font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300 text-x1 md:text-2x1">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  