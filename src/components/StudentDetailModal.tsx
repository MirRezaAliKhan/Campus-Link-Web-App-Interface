import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GraduationCap, Award, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  year: string;
  photo: string;
  subjects: {
    name: string;
    test1: number;
    test2: number;
    test3: number;
    average: number;
  }[];
}

interface StudentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

export function StudentDetailModal({ open, onOpenChange, student }: StudentDetailModalProps) {
  if (!student) return null;

  // Prepare chart data
  const chartData = student.subjects.map(subject => ({
    name: subject.name,
    Test1: subject.test1,
    Test2: subject.test2,
    Test3: subject.test3,
  }));

  const overallAverage = student.subjects.reduce((acc, s) => acc + s.average, 0) / student.subjects.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Performance Report</DialogTitle>
        </DialogHeader>

        {/* Student Info Header */}
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg">
              <AvatarImage src={student.photo} />
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">{student.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Roll Number</p>
                  <p className="text-gray-900">{student.rollNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="text-gray-900">{student.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Academic Year</p>
                  <p className="text-gray-900">{student.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overall Average</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900">{overallAverage.toFixed(1)}%</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Excellent
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject-wise Internal Marks Table */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Subject-wise Internal Marks
          </h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center">Test 1</TableHead>
                  <TableHead className="text-center">Test 2</TableHead>
                  <TableHead className="text-center">Test 3</TableHead>
                  <TableHead className="text-center">Average</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.subjects.map((subject, index) => {
                  const grade = subject.average >= 90 ? 'A+' : 
                                subject.average >= 80 ? 'A' :
                                subject.average >= 70 ? 'B+' :
                                subject.average >= 60 ? 'B' : 'C';
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell className="text-center">{subject.test1}</TableCell>
                      <TableCell className="text-center">{subject.test2}</TableCell>
                      <TableCell className="text-center">{subject.test3}</TableCell>
                      <TableCell className="text-center">{subject.average.toFixed(1)}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={
                            grade === 'A+' ? 'bg-green-50 text-green-700 border-green-200' :
                            grade === 'A' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }
                        >
                          {grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Performance Graph */}
        <div>
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-600" />
            Performance Trend Across Tests
          </h3>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Test1" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Test2" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Test3" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Test 1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Test 2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Test 3</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
