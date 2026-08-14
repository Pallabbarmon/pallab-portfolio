import { motion } from 'framer-motion'
import { FaFilePdf } from 'react-icons/fa'
import { useDocument } from '../../hooks/useDocument'

const experiences = [
  {
    id: 'thesis',
    title: 'Undergraduate Thesis Research',
    subtitle:
      'Application of Machine Learning and Deep Learning for Automatic Detection and Classification of Topographic Objects in Bangladesh Using Satellite Imagery',
    points: [
      'Conducted comparative research using Machine Learning and Deep Learning techniques for topographic object classification.',
      'Implemented and evaluated models including Random Forest, SVM, XGBoost, Extra Trees, U-Net++, and DeepLabV3+.',
      'Processed Sentinel-2 satellite imagery using Google Earth Engine and Python.',
      'Performed data preprocessing, feature extraction, model training, and performance evaluation.',
      'Utilized Python, TensorFlow, Scikit-learn, OpenCV, NumPy, Pandas, and GIS tools throughout the research.',
    ],
    hasThesis: true,
  },
  {
    id: 'academic-project',
    title: 'Academic Project',
    subtitle: 'Satellite Image Classification & Semantic Segmentation',
    points: [
      'Developed an end-to-end pipeline for satellite image preprocessing, classification, and semantic segmentation.',
      'Compared traditional machine learning algorithms with deep learning models.',
      'Evaluated model performance using standard classification metrics and visualization techniques.',
    ],
  },
]

export default function Experience() {
  const { doc: thesis } = useDocument('thesis')
  const API_BASE = import.meta.env.VITE_API_URL

  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-3"
      >
        Research &amp; Academic Experience
      </motion.h2>

      <div className="mt-10 flex flex-col gap-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass p-6"
          >
            <h3 className="text-sm uppercase tracking-wide text-[var(--accent)] font-semibold">
              {exp.title}
            </h3>
            <p className="mt-1 font-medium text-[var(--text-primary)]">
              {exp.subtitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {exp.points.map((point, pi) => (
                <li
                  key={pi}
                  className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-[var(--accent)]"
                >
                  {point}
                </li>
              ))}
            </ul>

            {exp.hasThesis && thesis && (
              <motion.a
                href={`${API_BASE}${thesis.file_path}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 3 }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
              >
                <FaFilePdf /> Read Full Thesis
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}