import React from 'react';
import { BarChart3, FileText, Download } from 'lucide-react';

const ReportCard: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4 mb-3">
            <FileText className="w-8 h-8 text-brand-blue-500" />
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
        <button className="w-full mt-4 flex items-center justify-center text-sm font-semibold text-white bg-brand-blue-600 hover:bg-brand-blue-700 px-3 py-2 rounded-md transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Generate Report
        </button>
    </div>
);

const ReportsPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-6">
          <BarChart3 className="w-8 h-8 text-brand-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Reports Center</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-600 mb-6">
            Welcome to the Reports Center. Here you can generate, view, and download various academic and administrative reports.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReportCard title="Student Grade Report" description="Download report cards for a specific class or student." />
            <ReportCard title="Attendance Summary" description="Generate attendance percentage reports for any date range." />
            <ReportCard title="Fee Collection Report" description="View detailed fee collection and defaulter lists." />
            <ReportCard title="Enrollment Statistics" description="Analyze student enrollment trends over academic years." />
            <ReportCard title="Faculty Workload Report" description="Summary of classes and subjects assigned to faculty." />
            <ReportCard title="Exam Performance" description="Compare subject-wise performance across different exams." />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
