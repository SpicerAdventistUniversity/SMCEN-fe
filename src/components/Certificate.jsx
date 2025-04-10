import React from "react";

const Certificate = () => {
  return (
    <div className="p-2 max-w-4xl mx-auto border border-gray-900 shadow-md bg-white font-mono text-xs leading-tight">
      <h2 className="text-center text-sm font-bold">SPICER MEMORIAL COLLEGE</h2>
      <p className="text-center">Ganeshkhind Post, Aundh Road</p>
      <p className="text-center">Pune 411 067, INDIA</p>
      <p className="text-center">Phone: 25807000, 7001</p>
      <hr className="border-gray-900" />
      <h3 className="text-center text-xs font-semibold">Certificate OF CREDITS</h3>
      
      {/* Student Info */}
      <div className="border border-gray-900 p-1 grid grid-cols-2 gap-0 text-xs">
        <div className="text-left">
          <p><strong>Name:</strong> Mohanapriya Christian</p><p><strong>Id No:</strong> C 841</p><p><strong>Date of Birth:</strong> June 2021</p>
        </div>
        <div className="text-left">
          <p><strong>Completion Date:</strong> June 2022</p><p><strong>Cumulative GPA:</strong> 3.89</p><p><strong>Basis of Admission:</strong> General Nursing</p>
        </div>
      </div>
      
      {/* Academic Records */}
      <div className="mt-1 border border-gray-900 text-xs">
        <h4 className="font-bold text-center bg-gray-200 p-1 border-b border-gray-900">ACADEMIC RECORD</h4>
        
        {/* First Semester */}
        <h5 className="font-bold pl-1">FIRST SEMESTER 2025-2026</h5>
        <table className="w-full border-collapse border border-gray-900 text-left text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-900 p-1">Course No</th>
              <th className="border border-gray-900 p-1">Course Title</th>
              <th className="border border-gray-900 p-1">Hrs</th>
              <th className="border border-gray-900 p-1">Gr</th>
              <th className="border border-gray-900 p-1">Pts</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-900 p-1">RELB151</td><td className="border border-gray-900 p-1">Christian Beliefs I</td><td className="border border-gray-900 p-1">2</td><td className="border border-gray-900 p-1">A</td><td className="border border-gray-900 p-1">8.00</td></tr>
            <tr><td className="border border-gray-900 p-1">RELB291</td><td className="border border-gray-900 p-1">Apocalyptic Literature</td><td className="border border-gray-900 p-1">2</td><td className="border border-gray-900 p-1">A</td><td className="border border-gray-900 p-1">12.00</td></tr>
          </tbody>
        </table>
        <p className="font-bold text-right pr-1">Total Credits: 12 | Total Grade Points: 46.00</p>
        
        {/* Second Semester */}
        <h5 className="font-bold pl-1">SECOND SEMESTER 2025-2026</h5>
        <table className="w-full border-collapse border border-gray-900 text-left text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-900 p-1">Course No</th>
              <th className="border border-gray-900 p-1">Course Title</th>
              <th className="border border-gray-900 p-1">Hrs</th>
              <th className="border border-gray-900 p-1">Gr</th>
              <th className="border border-gray-900 p-1">Pts</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-900 p-1">RELB151</td><td className="border border-gray-900 p-1">Religions of the World</td><td className="border border-gray-900 p-1">2</td><td className="border border-gray-900 p-1">A</td><td className="border border-gray-900 p-1">8.00</td></tr>
            <tr><td className="border border-gray-900 p-1">HLED121</td><td className="border border-gray-900 p-1">Personal Health</td><td className="border border-gray-900 p-1">2</td><td className="border border-gray-900 p-1">A</td><td className="border border-gray-900 p-1">12.00</td></tr>
          </tbody>
        </table>
        <p className="font-bold text-right pr-1">Total Credits: 12 | Total Grade Points: 47.34</p>
      </div>
      
      {/* Footer */}
      <div className="mt-1 border-t border-gray-900 pt-1 text-xs">
        <p className="text-center font-bold">The Certificate is valid when it contains the ink signature of the Registrar and the embossed seal of the College.</p>
        <p className="text-center">ISSUED WITHOUT CORRECTION OR ERASURE</p>
      </div>
      
      {/* Registrar Signature */}
      <div className="mt-1 text-xs">
        <div className="flex justify-between">
          <p>________________________</p>
          <p>_____________</p>
        </div>
        <div className="flex justify-between">
          <p><strong>Registrar</strong></p>
          <p><strong>Date</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
