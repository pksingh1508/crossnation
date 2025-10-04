import React, { useState } from "react";
import { Copy, Check, Building2 } from "lucide-react";

interface BankDetailProps {
  owner?: string;
  currency?: string;
  iban?: string;
  swiftCode?: string;
  bankName?: string;
  bankAddress?: string;
  bankCountry?: string;
}

const BankDetails: React.FC<BankDetailProps> = ({
  owner = "EU PRIME SERWIS SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
  currency = "EUR",
  iban = "PL12109018700000000159966769",
  swiftCode = "WBKPPLPP",
  bankName = "Santander Bank Polska S.A.",
  bankAddress = "al. Jana Pawła II 17, 00-854 Warsaw",
  bankCountry = "Poland",
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => copyToClipboard(text, field)}
      className="ml-2 p-1.5 rounded-md hover:bg-blue-50 transition-colors duration-200"
      title="Copy to clipboard"
    >
      {copiedField === field ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400 hover:text-blue-600" />
      )}
    </button>
  );

  const Field = ({
    label,
    value,
    fieldKey,
  }: {
    label: string;
    value: string;
    fieldKey: string;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 bg-gray-50 rounded-lg px-3 sm:px-4 py-2.5 border border-gray-200 hover:bg-gray-100 transition">
      <span className="text-sm font-semibold text-gray-600">{label}</span>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
        <span className="text-gray-900 text-sm font-mono break-all">
          {value}
        </span>
        <CopyButton text={value} field={fieldKey} />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8">
      <div className="bg-white w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 px-5 py-4 flex items-center gap-3">
          <Building2 className="w-7 h-7 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-700">
            Bank Account Details
          </h2>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 grid grid-cols-1  gap-3 sm:gap-4">
          <Field label="Account Owner" value={owner} fieldKey="owner" />
          <Field label="Currency" value={currency} fieldKey="currency" />
          <Field label="IBAN" value={iban} fieldKey="iban" />
          <Field label="SWIFT/BIC Code" value={swiftCode} fieldKey="swift" />
          <Field label="Bank Name" value={bankName} fieldKey="bankName" />
          <Field
            label="Bank Address"
            value={bankAddress}
            fieldKey="bankAddress"
          />
          <Field label="Country" value={bankCountry} fieldKey="bankCountry" />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            Please ensure all details are correct before making a transfer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
