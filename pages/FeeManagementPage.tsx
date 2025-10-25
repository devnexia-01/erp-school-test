import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { mockFeeRecords, initialFeeData } from '../data/mockData';
import FeeChart from '../components/FeeChart';
import StatCard from '../components/StatCard';
import { Banknote, CheckCircle, Clock } from 'lucide-react';
import { FeeRecord } from '../types';

const AdminFeeDashboard: React.FC = () => {
    const totalCollected = initialFeeData.reduce((acc, month) => acc + month.collected, 0);
    const totalDue = initialFeeData.reduce((acc, month) => acc + month.due, 0);
    const pending = totalDue - totalCollected;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <StatCard title="Total Collected (YTD)" value={`₹${totalCollected.toFixed(1)}L`} icon={Banknote} color="text-green-500"/>
                 <StatCard title="Total Pending" value={`₹${pending.toFixed(1)}L`} icon={Clock} color="text-red-500"/>
                 <StatCard title="Collection Rate" value={`${((totalCollected/totalDue)*100).toFixed(1)}%`} icon={CheckCircle} color="text-blue-500"/>
            </div>
            <FeeChart data={initialFeeData} />
        </div>
    );
}

const StudentParentFeeView: React.FC = () => {

    const getStatusBadge = (status: FeeRecord['status']) => {
        const colors = {
          Paid: 'bg-green-100 text-green-800',
          Due: 'bg-yellow-100 text-yellow-800',
          Overdue: 'bg-red-100 text-red-800'
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">My Fee History</h2>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No.</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mockFeeRecords.map(record => (
                    <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{record.invoiceNumber}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{record.amount.toLocaleString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(record.status)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            {record.status !== 'Paid' ? (
                                <button className="text-sm font-semibold text-white bg-brand-blue-600 hover:bg-brand-blue-700 px-3 py-1 rounded-md">Pay Now</button>
                            ) : (
                                 <button className="text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">View Receipt</button>
                            )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}

const FeeManagementPage: React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Fee Management</h1>
            {user?.role === 'Admin' ? <AdminFeeDashboard /> : <StudentParentFeeView />}
        </div>
    );
};

export default FeeManagementPage;