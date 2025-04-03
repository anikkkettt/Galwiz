const WorkFlow = require("./../../models/main/workFlowModel");
const workFlowData = [
  {
    title: "Air Quality Prediction Prototype",
    link: "https://workflowhub.eu/workflows/380",
  },
  {
    title: "HTR-Collections-test",
    link: "https://workflowhub.eu/workflows/375",
  },
  {
    title: "DLA-Collections-test",
    link: "https://workflowhub.eu/workflows/374",
  },
  {
    title: "De novo digitisation",
    link: "https://workflowhub.eu/workflows/373",
  },
  {
    title: "VGP-meryldb-creation/main",
    link: "https://workflowhub.eu/workflows/366",
  },
  {
    title: "VGP-meryldb-creation-trio/main",
    link: "https://workflowhub.eu/workflows/365",
  },
  {
    title:
      "Workflow for running the Community Earth System Model in fully coupled mode",
    link: "https://workflowhub.eu/workflows/364",
  },
  {
    title: "Trio Analysis",
    link: "https://workflowhub.eu/workflows/363",
  },
  {
    title: "ML phylogenetic reconstruction",
    link: "https://workflowhub.eu/workflows/359",
  },
  {
    title: "preparing genomic data for phylogeny recostruction (GTN)",
    link: "https://workflowhub.eu/workflows/358",
  },
  {
    title: "generic-variant-calling-wgs-pe/main",
    link: "https://workflowhub.eu/workflows/357",
  },
  {
    title: "Generic consensus construction from VCF calls",
    link: "https://workflowhub.eu/workflows/356",
  },
  {
    title: "Generic variation analysis reporting",
    link: "https://workflowhub.eu/workflows/354",
  },
  {
    title: "Generic variation analysis on WGS PE data",
    link: "https://workflowhub.eu/workflows/353",
  },
  {
    title: "Partial ref-guided workflow - gstacks and pops",
    link: "https://workflowhub.eu/workflows/352",
  },
  {
    title: "Partial ref-guided workflow - bwa mem only",
    link: "https://workflowhub.eu/workflows/351",
  },
  {
    title: "Partial de novo workflow: c-s-g-pops only",
    link: "https://workflowhub.eu/workflows/350",
  },
  {
    title: "Partial de novo workflow: ustacks only",
    link: "https://workflowhub.eu/workflows/349",
  },
  {
    title: "Stacks RAD-seq de novo workflow",
    link: "https://workflowhub.eu/workflows/348",
  },
  {
    title: "Stacks RAD-seq reference-guided workflow",
    link: "https://workflowhub.eu/workflows/347",
  },
  {
    title: "QC of RADseq reads",
    link: "https://workflowhub.eu/workflows/346",
  },
  {
    title: "Biomarker screening in preeclampsia",
    link: "https://workflowhub.eu/workflows/338",
  },
  {
    title: "VGP HiFi phased assembly with hifiasm and HiC data",
    link: "https://workflowhub.eu/workflows/325",
  },
  {
    title: "VGP hybrid scaffolding with HiC data",
    link: "https://workflowhub.eu/workflows/324",
  },
  {
    title: "VGP hybrid scaffolding with Bionano optical maps",
    link: "https://workflowhub.eu/workflows/322",
  },
  {
    title: "VGP purge assembly with purge_dups pipeline",
    link: "https://workflowhub.eu/workflows/321",
  },
  {
    title: "VGP HiFi phased assembly with hifiasm and HiC data",
    link: "https://workflowhub.eu/workflows/318",
  },
  {
    title: "VGP genome profile analysis",
    link: "https://workflowhub.eu/workflows/309",
  },
  {
    title: "Galaxy ABC MD Setup tutorial",
    link: "https://workflowhub.eu/workflows/299",
  },
  {
    title: "Galaxy Amber Protein Ligand Complex MD Setup tutorial",
    link: "https://workflowhub.eu/workflows/298",
  },
  {
    title: "Galaxy Amber Protein MD Setup tutorial",
    link: "https://workflowhub.eu/workflows/297",
  },
  {
    title: "Galaxy Protein-ligand Docking tutorial (Fpocket)",
    link: "https://workflowhub.eu/workflows/296",
  },
  {
    title: "Galaxy Protein Ligand Complex MD Setup",
    link: "https://workflowhub.eu/workflows/295",
  },
  {
    title: "Galaxy GMX Automatic Ligand Parameterization tutorial",
    link: "https://workflowhub.eu/workflows/294",
  },
  {
    title: "Galaxy Protein MD Setup tutorial",
    link: "https://workflowhub.eu/workflows/277",
  },
  {
    title: "Galaxy workflow demonstrating the usage of EODIE Galaxy Tool",
    link: "https://workflowhub.eu/workflows/274",
  },
  {
    title: "sars-cov-2-variation-reporting/COVID-19-VARIATION-REPORTING",
    link: "https://workflowhub.eu/workflows/109",
  },
  {
    title:
      "sars-cov-2-pe-illumina-artic-variant-calling/COVID-19-PE-ARTIC-ILLUMINA",
    link: "https://workflowhub.eu/workflows/110",
  },
  {
    title:
      "Protein MD Setup tutorial using BioExcel Building Blocks (biobb) in Galaxy",
    link: "https://workflowhub.eu/workflows/194",
  },
  {
    title: "parallel-accession-download/main",
    link: "https://workflowhub.eu/workflows/137",
  },
  {
    title:
      "sars-cov-2-consensus-from-variation/COVID-19-CONSENSUS-CONSTRUCTION",
    link: "https://workflowhub.eu/workflows/138",
  },
  {
    title: "Pangeo 101 for everyone - introduction to Xarray",
    link: "https://workflowhub.eu/workflows/252",
  },
  {
    title: "fragment-based-docking-scoring/main",
    link: "https://workflowhub.eu/workflows/246",
  },
  {
    title: "gromacs-dctmd/main",
    link: "https://workflowhub.eu/workflows/249",
  },
  {
    title: "protein-ligand-complex-parameterization/main",
    link: "https://workflowhub.eu/workflows/247",
  },
  {
    title: "gromacs-mmgbsa/main",
    link: "https://workflowhub.eu/workflows/248",
  },
  {
    title: "sars-cov-2-ont-artic-variant-calling/COVID-19-ARTIC-ONT",
    link: "https://workflowhub.eu/workflows/111",
  },
  {
    title:
      "sars-cov-2-pe-illumina-artic-ivar-analysis/SARS-COV-2-ILLUMINA-AMPLICON-IVAR-PANGOLIN-NEXTCLADE",
    link: "https://workflowhub.eu/workflows/155",
  },
  {
    title:
      "sars-cov-2-se-illumina-wgs-variant-calling/COVID-19-SE-WGS-ILLUMINA",
    link: "https://workflowhub.eu/workflows/112",
  },
  {
    title:
      "sars-cov-2-pe-illumina-wgs-variant-calling/COVID-19-PE-WGS-ILLUMINA",
    link: "https://workflowhub.eu/workflows/113",
  },
  {
    title:
      "Investigation of lockdown effect on air quality between January 2019 to May 2021",
    link: "https://workflowhub.eu/workflows/251",
  },
  {
    title: "De novo digitisation",
    link: "https://workflowhub.eu/workflows/245",
  },
  {
    title:
      "Purge duplicates from hifiasm assembly v1.0 (HiFi genome assembly stage 3)",
    link: "https://workflowhub.eu/workflows/237",
  },
  {
    title: "Combined workflows for large genome assembly",
    link: "https://workflowhub.eu/workflows/230",
  },
  {
    title: "16S_biodiversity_for_nonoverlap_paired_end",
    link: "https://workflowhub.eu/workflows/233",
  },
  {
    title: "16S_biodiversity_for_overlap_paired_end",
    link: "https://workflowhub.eu/workflows/232",
  },
  {
    title:
      "PacBio HiFi genome assembly using hifiasm (HiFi genome assembly stage 2)",
    link: "https://workflowhub.eu/workflows/221",
  },
  {
    title: "CCS.BAM to FASTQ + QC (HiFi genome assembly stage 1)",
    link: "https://workflowhub.eu/workflows/220",
  },
  {
    title: "Assess genome quality",
    link: "https://workflowhub.eu/workflows/229",
  },
  {
    title: "Racon polish with long reads, x4",
    link: "https://workflowhub.eu/workflows/227",
  },
  {
    title: "Assembly with Flye",
    link: "https://workflowhub.eu/workflows/225",
  },
  {
    title: "Trim and filter reads - fastp",
    link: "https://workflowhub.eu/workflows/224",
  },
  {
    title: "kmer counting - meryl",
    link: "https://workflowhub.eu/workflows/223",
  },
  {
    title: "Data QC",
    link: "https://workflowhub.eu/workflows/222",
  },
  {
    title: "Racon polish with Illumina reads, x2",
    link: "https://workflowhub.eu/workflows/228",
  },
  {
    title: "Assembly polishing",
    link: "https://workflowhub.eu/workflows/226",
  },
  {
    title: "lncRNA",
    link: "https://workflowhub.eu/workflows/199",
  },
  {
    title: "Workflow of BioTranslator Comparative Analysis",
    link: "https://workflowhub.eu/workflows/193",
  },
  {
    title: "16S_biodiversity_BIOM",
    link: "https://workflowhub.eu/workflows/142",
  },
  {
    title: "1: Plant virus detection with kraken2 (SE)",
    link: "https://workflowhub.eu/workflows/124",
  },
  {
    title: "1: Plant virus detection with kraken2 (PE)",
    link: "https://workflowhub.eu/workflows/101",
  },
  {
    title:
      "Compute daily and monthly mean from meteorological station measurements",
    link: "https://workflowhub.eu/workflows/123",
  },
  {
    title:
      "Workflow constructed from history 'test dwc from PNDB Data package EML DwC annotations'",
    link: "https://workflowhub.eu/workflows/117",
  },
  {
    title: "Object tracking using CellProfiler",
    link: "https://workflowhub.eu/workflows/115",
  },
  {
    title: "3: Plant virus exploration",
    link: "https://workflowhub.eu/workflows/103",
  },
  {
    title: "2: Plant virus confirmation",
    link: "https://workflowhub.eu/workflows/102",
  },
  {
    title: "0: View complete virus identification",
    link: "https://workflowhub.eu/workflows/100",
  },
  {
    title: "COVID-19: read pre-processing",
    link: "https://workflowhub.eu/workflows/99",
  },
  {
    title: "MC_COVID19like_Assembly_Reads",
    link: "https://workflowhub.eu/workflows/68",
  },
  {
    title: "RNA-RNA interactome analysis using CLAN",
    link: "https://workflowhub.eu/workflows/67",
  },
  {
    title: "RNA-RNA interactome analysis using BWA-MEM",
    link: "https://workflowhub.eu/workflows/66",
  },
  {
    title: "CLM-FATES_ALP1_simulation_5years",
    link: "https://workflowhub.eu/workflows/65",
  },
  {
    title: "ONT -- Metagenomics-Kraken2-Krona",
    link: "https://workflowhub.eu/workflows/53",
  },
  {
    title: "ONT - Workflow-Wick-et.al.",
    link: "https://workflowhub.eu/workflows/52",
  },
  {
    title: "ONT -- Assembly-Flye-AhrensLab",
    link: "https://workflowhub.eu/workflows/51",
  },
  {
    title: "ONT --Tutorial-Nanopolish-variants",
    link: "https://workflowhub.eu/workflows/50",
  },
  {
    title:
      "Population and community metrics calculation from Biodiversity data",
    link: "https://workflowhub.eu/workflows/49",
  },
  {
    title: "Copernicus Essential Climate Variable - select and plot",
    link: "https://workflowhub.eu/workflows/46",
  },
  {
    title: "Climate - Climate 101",
    link: "https://workflowhub.eu/workflows/42",
  },
  {
    title: "Assembly using Tophat2 and annotation (alternate)",
    link: "https://workflowhub.eu/workflows/37",
  },
  {
    title: "Unicycler assembly and annotation",
    link: "https://workflowhub.eu/workflows/38",
  },
  {
    title: "StringTie assembly and annotation",
    link: "https://workflowhub.eu/workflows/39",
  },
  {
    title: "Assembly using Tophat2 and annotation",
    link: "https://workflowhub.eu/workflows/40",
  },
  {
    title: "COVID-19: VARSCAN",
    link: "https://workflowhub.eu/workflows/36",
  },
  {
    title: "COVID-19: GATK4",
    link: "https://workflowhub.eu/workflows/35",
  },
  {
    title: "Pathway Ranker",
    link: "https://workflowhub.eu/workflows/25",
  },
  {
    title: "RetroSynthesis",
    link: "https://workflowhub.eu/workflows/24",
  },
  {
    title: "Genetic Design",
    link: "https://workflowhub.eu/workflows/23",
  },
  {
    title: "Pathway Analysis",
    link: "https://workflowhub.eu/workflows/22",
  },
  {
    title: "Cheminformatics - XChem combined",
    link: "https://workflowhub.eu/workflows/18",
  },
  {
    title: "Cheminformatics - Filter results",
    link: "https://workflowhub.eu/workflows/17",
  },
  {
    title: "Cheminformatics - TransFS scoring",
    link: "https://workflowhub.eu/workflows/16",
  },
  {
    title: "Cheminformatics - SuCOS scoring",
    link: "https://workflowhub.eu/workflows/15",
  },
  {
    title: "Cheminformatics - Docking",
    link: "https://workflowhub.eu/workflows/14",
  },
  {
    title: "Cheminformatics - Active site generation",
    link: "https://workflowhub.eu/workflows/13",
  },
  {
    title: "Cheminformatics - Enumerate ligands for docking",
    link: "https://workflowhub.eu/workflows/12",
  },
  {
    title: "Genomics - Recombination and selection analysis",
    link: "https://workflowhub.eu/workflows/10",
  },
  {
    title: "Genomics - Analysis of S-protein polymorphism",
    link: "https://workflowhub.eu/workflows/9",
  },
  {
    title: "Genomics - SE Variation",
    link: "https://workflowhub.eu/workflows/8",
  },
  {
    title: "Genomics - PE Variation",
    link: "https://workflowhub.eu/workflows/7",
  },
  {
    title: "Genomics - MRCA analysis",
    link: "https://workflowhub.eu/workflows/6",
  },
  {
    title: "Genomics - Assembly of the genome sequence",
    link: "https://workflowhub.eu/workflows/5",
  },
  {
    title: "Genomics - Read pre-processing without downloading from SRA",
    link: "https://workflowhub.eu/workflows/4",
  },
  {
    title: "Genomics - Read pre-processing",
    link: "https://workflowhub.eu/workflows/2",
  },
];

exports.createWorkFlow = async (req, res) => {
  try {
    const { title, link } = req.body;
    // console.log(title);
    // console.log(link);
    const workFlow = await WorkFlow.create({
      title,
      link,
    });
    res.status(201).json({
      status: "success",
      message: "Workflow created successfully",
      workFlow,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
// exports.createWorkFlow = async (req, res) => {
//   try {
//     const wf = await WorkFlow.find();
//     if (wf.length === 0) {
//       const workflows = await WorkFlow.insertMany(workFlowData);
//       res.status(201).json({
//         status: "created",
//         message: "Work Flow created successfully",
//         workflows,
//       });
//     } else {
//       res.status(409).json({ status: "conflict", message: "already created" });
//     }
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Internal Server Error" });
//   }
// };

exports.getWorkFlowWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const workFlow = await WorkFlow.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalWorkFlow = await WorkFlow.count();
    res.status(200).json({
      status: "success",
      message: "workFlow with limit",
      workFlow,
      totalWorkFlow,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.searchWorkFlow = async (req, res) => {
  try {
    const query1 = capitalizeFirstLetter(req.params.query);
    const query2 = req.params.query;
    // console.log(query);

    const workFlow = await WorkFlow.find({
      $or: [
        { title: { $regex: `${query1}` } },
        { title: { $regex: `${query2}` } },
      ],
      // { $text: { $search: query, $caseSensitive: true } }
    }).limit(20);
    res
      .status(200)
      .json({ status: "success", message: "Search Data", workFlow });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
