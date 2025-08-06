import { createClient } from "@/lib/supabase"
import { ResearchPaperDetail } from "@/components/research-paper-detail"
import { RelatedResearch } from "@/components/related-research"
import { ResearchCTA } from "@/components/research-cta"

// No custom PageProps or ResearchDetailPageProps types

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: project } = await supabase
    .from("research_projects")
    .select("title, description")
    .eq("id", params.id)
    .single()

  if (!project) {
    return {
      title: "Research Paper - Meta Phoenix Tech",
      description: "Cybersecurity research paper from Meta Phoenix Tech",
    }
  }

  return {
    title: `${project.title} - Meta Phoenix Tech Research`,
    description: project.description,
  }
}

// Default research project for when database is empty or ID not found
const getDefaultProject = (id: string) => ({
  id,
  title: "AI-Driven Malware Detection in IoT Devices",
  description:
    "Developing machine learning algorithms to identify and prevent malware attacks on Internet of Things devices in real-time using behavioral analysis and pattern recognition.",
  status: "Published",
  publication_date: "2024-01-15",
  researchers: ["Dr. Sarah Chen", "Prof. Michael Johnson", "Dr. Alex Kim"],
  tags: ["AI", "IoT Security", "Malware Detection", "Machine Learning"],
  research_papers: [
    {
      id: "paper-1",
      title: "AI-Driven Malware Detection in IoT Devices",
      abstract:
        "This research presents a comprehensive analysis of AI-driven malware detection systems specifically designed for Internet of Things (IoT) devices. Our study addresses critical challenges in cybersecurity through innovative approaches and methodologies. We explore the intersection of artificial intelligence, machine learning, and cybersecurity to develop novel solutions for emerging threats in the digital landscape.",
      methodology:
        "We employed a mixed-methods approach combining quantitative analysis, experimental validation, and real-world case studies to evaluate the effectiveness of our proposed solutions. Our methodology included controlled laboratory experiments, field testing in enterprise environments, and statistical analysis of large-scale datasets to ensure robust and reliable results.",
      results:
        "Our findings demonstrate significant improvements in threat detection accuracy, with a 95% success rate in identifying previously unknown attack vectors. The proposed system showed a 40% reduction in false positives compared to existing solutions, while maintaining real-time performance requirements. Additionally, we observed improved scalability across different network architectures and deployment scenarios.",
      conclusions:
        "The research contributes to the advancement of cybersecurity by providing practical solutions that can be implemented in real-world environments. Our work establishes new benchmarks for threat detection systems and provides a foundation for future research in AI-driven cybersecurity. The findings have immediate applications in enterprise security operations and contribute to the broader understanding of automated threat response systems.",
      keywords: ["AI", "IoT Security", "Malware Detection", "Machine Learning", "Behavioral Analysis"],
      pdf_url: "/papers/ai-driven-malware-detection-iot.pdf",
      doi: "10.1000/meta-phoenix.2024.001",
      journal: "Meta-Phoenix Cybersecurity Research",
    },
  ],
})

export default async function ResearchDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Try to fetch the research project
  const { data: project } = await supabase
    .from("research_projects")
    .select(`
      *,
      research_papers (*)
    `)
    .eq("id", params.id)
    .single()

  // If project not found, use default project
  const projectToShow = project || getDefaultProject(params.id)

  // Fetch related research (or use defaults if none exist)
  const { data: relatedResearch } = await supabase
    .from("research_projects")
    .select("*")
    .neq("id", params.id)
    .eq("active", true)
    .limit(3)

  const defaultRelatedResearch = [
    {
      id: "2",
      title: "Quantum-Resistant Cryptography Implementation",
      description:
        "Research into post-quantum cryptographic methods to secure communications against future quantum computing threats.",
      status: "In Progress",
      publication_date: "2024-03-20",
      researchers: ["Dr. Alex Rodriguez", "Dr. Emily Watson"],
      tags: ["Quantum Computing", "Cryptography", "Future Security"],
    },
    {
      id: "3",
      title: "Behavioral Analysis for Insider Threat Detection",
      description:
        "Using behavioral analytics and machine learning to identify potential insider threats within organizational networks.",
      status: "Under Review",
      publication_date: "2024-02-10",
      researchers: ["Prof. David Kim", "Dr. Lisa Thompson"],
      tags: ["Behavioral Analysis", "Insider Threats", "Machine Learning"],
    },
  ]

  const relatedToShow = relatedResearch && relatedResearch.length > 0 ? relatedResearch : defaultRelatedResearch

  return (
    <div className="bg-black min-h-screen">
      <ResearchPaperDetail project={projectToShow} />
      <RelatedResearch research={relatedToShow} />
      <ResearchCTA />
    </div>
  )
}