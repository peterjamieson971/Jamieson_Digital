import { Download, FileText } from 'lucide-react';

interface DownloadCTAProps {
  title: string;
  downloadUrl: string;
  fileSize?: string;
  fileName?: string;
  description?: string;
  className?: string;
}

export function DownloadCTA({
  title,
  downloadUrl,
  fileSize,
  fileName = "Download Guide",
  description,
  className = ""
}: DownloadCTAProps) {
  const handleDownload = () => {
    // Track download event for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'engagement',
        event_label: fileName,
        value: 1
      });
    }

    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 md:p-8 my-8 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>

          {description && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                PDF Guide
              </span>
              {fileSize && (
                <span>
                  {fileSize}
                </span>
              )}
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}