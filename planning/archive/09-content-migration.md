# Content Migration Strategy - AI Science Portfolio

## 📋 Migration Overview

### Current Content Inventory

#### Existing Blog Posts (from mysite)
1. **AI Agents in Biomedicine** (`AI_agents_BioMed.ipynb`)
   - Interactive Jupyter notebook format
   - 22,706 bytes of content
   - Multiple code cells with Python examples
   - Markdown explanations and theory

2. **T-test Applications** (`T-test-alt.ipynb`, `T-test.ipynb`)
   - Statistical analysis tutorials
   - Interactive code demonstrations
   - Practical bioinformatics applications

3. **Top 10 Statistical Concepts in Bioinformatics** (`Top10_bioinfo_stats.ipynb`)
   - Educational content with code examples
   - Mathematical formulations
   - Interactive visualizations

4. **BioNumPy Tutorial** (`bioNumpy.qmd`)
   - Comprehensive package overview
   - 10 key features with examples
   - Practical applications in bioinformatics

5. **Basic Jupyter Demo** (`hello.ipynb`)
   - Simple notebook with matplotlib examples
   - Data visualization demonstrations

#### Static Content
- **Profile Information**: Professional bio, education, experience
- **Publications List**: Research papers with citations
- **Project Descriptions**: Brief project summaries
- **Images**: Profile photo (652KB - needs optimization)

### Migration Priority Matrix

| Content | Priority | Complexity | Interactive Elements | Migration Effort |
|---------|----------|------------|---------------------|------------------|
| Bio/About Page | High | Low | None | 1-2 hours |
| Publications | High | Low | Citation links | 2-3 hours |
| T-test Tutorials | High | Medium | Code execution | 4-6 hours |
| Statistical Concepts | High | High | Multiple widgets | 6-8 hours |
| BioNumpy Guide | Medium | Medium | Code examples | 3-4 hours |
| AI Agents Article | Medium | High | Interactive demos | 8-10 hours |
| Profile Images | Low | Low | Optimization | 1 hour |

## 🔄 Content Transformation Process

### Phase 1: Static Content Migration (Week 1)

#### Professional Information
```typescript
// content/about/bio.mdx
---
title: "About Sanjeeva Reddy Dodlapati"
description: "PhD in Computer Science specializing in AI for genomics and bioinformatics"
lastUpdated: "2025-01-01"
seo:
  title: "Sanjeeva Reddy Dodlapati - AI Researcher & Bioinformatics Expert"
  description: "PhD researcher specializing in AI applications in genomics, drug discovery, and computational biology"
  keywords: ["AI", "genomics", "bioinformatics", "machine learning", "computational biology"]
---

# About Me

I am a PhD researcher in Computer Science at Old Dominion University, Norfolk, VA, specializing in the intersection of artificial intelligence and life sciences. My work focuses on developing novel computational methods for genomics, drug discovery, and personalized medicine.

## Education

- **PhD in Computer Science** (In Progress)  
  *Old Dominion University, Norfolk, VA*  
  Research Focus: AI applications in genomics and drug discovery

- **MS in Chemistry**  
  *University of New Orleans, LA*  
  Specialization: Computational chemistry and molecular modeling

## Research Interests

<ResearchInterests>
  <Interest 
    title="AI for Genomics"
    description="Developing machine learning models for DNA methylation prediction and genomic sequence analysis"
    icon="dna"
  />
  <Interest 
    title="Drug Discovery"
    description="Computational approaches for drug-drug interaction prediction and molecular property prediction"
    icon="molecule"
  />
  <Interest 
    title="Transfer Learning"
    description="Applying transfer learning techniques to biological data with limited samples"
    icon="transfer"
  />
</ResearchInterests>

## Featured Publications

<PublicationsList>
  <Publication
    title="Completing Single-Cell DNA Methylome Profiles via Transfer Learning together with KL-Divergence"
    authors={["Sanjeeva Dodlapati", "ZC Jiang", "J Sun"]}
    journal="Frontiers in Genetics"
    year={2022}
    doi="10.3389/fgene.2022.910439"
    citations={12}
    abstract="We developed a novel transfer learning approach to predict missing DNA methylation values in single-cell datasets..."
  />
</PublicationsList>
```

#### Publications Database
```typescript
// data/publications.ts
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  citations?: number;
  abstract: string;
  keywords: string[];
  category: 'genomics' | 'ai' | 'drug-discovery' | 'methodology';
  status: 'published' | 'accepted' | 'submitted' | 'preprint';
  links?: {
    paper?: string;
    code?: string;
    data?: string;
    supplement?: string;
  };
}

export const publications: Publication[] = [
  {
    id: 'dodlapati-2022-methylation',
    title: 'Completing Single-Cell DNA Methylome Profiles via Transfer Learning together with KL-Divergence',
    authors: ['Sanjeeva Dodlapati', 'ZC Jiang', 'J Sun'],
    journal: 'Frontiers in Genetics',
    year: 2022,
    doi: '10.3389/fgene.2022.910439',
    citations: 12,
    abstract: 'Single-cell DNA methylation sequencing technologies have enabled researchers to investigate epigenetic heterogeneity at unprecedented resolution. However, the sparse and incomplete nature of single-cell methylation data poses significant challenges for downstream analysis. Here, we present a novel computational framework that leverages transfer learning combined with Kullback-Leibler divergence to impute missing methylation values in single-cell datasets...',
    keywords: ['DNA methylation', 'single-cell', 'transfer learning', 'epigenetics', 'computational biology'],
    category: 'genomics',
    status: 'published',
    links: {
      paper: 'https://www.frontiersin.org/articles/10.3389/fgene.2022.910439/full',
      code: 'https://github.com/SanjeevaRDodlapati/methylation-imputation',
    }
  },
  // ... more publications
];
```

### Phase 2: Interactive Content Migration (Weeks 2-3)

#### Jupyter Notebook to MDX Conversion Process

```bash
# Automated conversion script
#!/bin/bash
# scripts/convert-notebooks.sh

for notebook in content/notebooks/*.ipynb; do
  echo "Converting $notebook..."
  
  # Extract notebook name
  basename=$(basename "$notebook" .ipynb)
  
  # Convert using custom Python script
  python scripts/notebook-to-mdx.py "$notebook" "content/blog/${basename}.mdx"
  
  echo "Converted to content/blog/${basename}.mdx"
done
```

```python
# scripts/notebook-to-mdx.py
import json
import sys
import re
from pathlib import Path
from datetime import datetime

def convert_notebook_to_mdx(notebook_path, output_path):
    """Convert Jupyter notebook to MDX format with interactive components."""
    
    with open(notebook_path, 'r', encoding='utf-8') as f:
        notebook = json.load(f)
    
    # Extract metadata
    title = extract_title(notebook)
    description = extract_description(notebook)
    
    # Generate frontmatter
    frontmatter = generate_frontmatter(title, description)
    
    # Convert cells
    mdx_content = []
    mdx_content.append(frontmatter)
    mdx_content.append('')  # Empty line after frontmatter
    
    for cell in notebook['cells']:
        if cell['cell_type'] == 'markdown':
            mdx_content.extend(convert_markdown_cell(cell))
        elif cell['cell_type'] == 'code':
            mdx_content.extend(convert_code_cell(cell))
    
    # Write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(mdx_content))

def extract_title(notebook):
    """Extract title from first markdown cell."""
    for cell in notebook['cells']:
        if cell['cell_type'] == 'markdown':
            source = ''.join(cell['source'])
            # Look for first heading
            match = re.search(r'^#\s+(.+)$', source, re.MULTILINE)
            if match:
                return match.group(1).strip()
    return 'Untitled'

def generate_frontmatter(title, description):
    """Generate MDX frontmatter."""
    return f"""---
title: "{title}"
description: "{description}"
publishedAt: "{datetime.now().strftime('%Y-%m-%d')}"
category: "tutorial"
tags: ["bioinformatics", "python", "data-analysis"]
interactive: true
---"""

def convert_markdown_cell(cell):
    """Convert markdown cell to MDX."""
    lines = []
    source = ''.join(cell['source'])
    
    # Process mathematical formulas
    source = re.sub(r'\$\$([^$]+)\$\$', r'<Math block>\1</Math>', source)
    source = re.sub(r'\$([^$]+)\$', r'<Math>\1</Math>', source)
    
    lines.extend(source.split('\n'))
    lines.append('')  # Add spacing
    return lines

def convert_code_cell(cell):
    """Convert code cell to interactive CodeCell component."""
    lines = []
    source = ''.join(cell['source'])
    
    # Determine if cell has output
    has_output = 'outputs' in cell and len(cell['outputs']) > 0
    
    # Extract expected output if available
    expected_output = ""
    if has_output:
        for output in cell['outputs']:
            if 'text' in output:
                expected_output += ''.join(output['text'])
            elif 'data' in output and 'text/plain' in output['data']:
                expected_output += ''.join(output['data']['text/plain'])
    
    # Generate CodeCell component
    lines.append('<CodeCell')
    lines.append('  language="python"')
    lines.append(f'  title="Interactive Code Example"')
    lines.append('  allowExecution={true}')
    if expected_output:
        lines.append(f'  expectedOutput={`{expected_output.strip()}`}')
    lines.append('>')
    lines.append(source)
    lines.append('</CodeCell>')
    lines.append('')
    
    return lines

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python notebook-to-mdx.py <input.ipynb> <output.mdx>")
        sys.exit(1)
    
    convert_notebook_to_mdx(sys.argv[1], sys.argv[2])
    print(f"Converted {sys.argv[1]} to {sys.argv[2]}")
```

#### Example Converted Content

```mdx
---
title: "Top 10 Statistical Concepts in Bioinformatics"
description: "A comprehensive guide to essential statistical methods used in computational biology and bioinformatics analysis"
publishedAt: "2025-01-15"
category: "education"
tags: ["statistics", "bioinformatics", "data-analysis", "python"]
interactive: true
difficulty: "intermediate"
estimatedTime: "45 minutes"
---

# Statistical Foundations for Bioinformatics

In bioinformatics, statistical concepts are pivotal for analyzing and interpreting complex biological data. This interactive tutorial covers ten fundamental statistical concepts with hands-on examples.

## 1. Probability Theory and Bayes' Theorem

Probability theory quantifies the likelihood of events occurring. Bayes' Theorem provides a framework for updating probability estimates based on new evidence.

<Math block>
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
</Math>

Where:
- <Math>P(A|B)</Math> is the posterior probability
- <Math>P(B|A)</Math> is the likelihood
- <Math>P(A)</Math> is the prior probability

<CodeCell
  language="python"
  title="Bayes' Theorem in Action"
  allowExecution={true}
>
import numpy as np
import matplotlib.pyplot as plt

# Example: Disease diagnosis with genetic marker
# Prior probability of disease
P_disease = 0.01  # 1% of population has disease

# Test accuracy
P_positive_given_disease = 0.95  # 95% sensitivity
P_negative_given_no_disease = 0.99  # 99% specificity

# Calculate marginal probability of positive test
P_no_disease = 1 - P_disease
P_positive_given_no_disease = 1 - P_negative_given_no_disease
P_positive = (P_positive_given_disease * P_disease + 
              P_positive_given_no_disease * P_no_disease)

# Apply Bayes' theorem
P_disease_given_positive = (P_positive_given_disease * P_disease) / P_positive

print(f"Prior probability of disease: {P_disease:.3f}")
print(f"Probability of disease given positive test: {P_disease_given_positive:.3f}")
</CodeCell>

**Biological Application**: Determining the probability of a genetic variant being pathogenic based on population frequency and functional evidence.

## 2. Hypothesis Testing and p-values

<StatisticalTest
  title="Two-Sample T-Test"
  description="Compare means between two groups"
  interactiveDemo={true}
/>

<CodeCell
  language="python"
  title="Comparing Gene Expression Between Conditions"
  allowExecution={true}
>
import scipy.stats as stats
import numpy as np
import seaborn as sns

# Simulate gene expression data
np.random.seed(42)
control_group = np.random.normal(10, 2, 50)  # Control condition
treatment_group = np.random.normal(12, 2, 50)  # Treatment condition

# Perform t-test
t_stat, p_value = stats.ttest_ind(control_group, treatment_group)

print(f"T-statistic: {t_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"Significant at α=0.05: {p_value < 0.05}")

# Visualize distributions
plt.figure(figsize=(10, 6))
plt.hist(control_group, alpha=0.7, label='Control', bins=20)
plt.hist(treatment_group, alpha=0.7, label='Treatment', bins=20)
plt.xlabel('Gene Expression Level')
plt.ylabel('Frequency')
plt.legend()
plt.title('Gene Expression Distribution Comparison')
plt.show()
</CodeCell>

<InteractiveChart
  data={expressionData}
  title="Gene Expression Comparison"
  chartType="boxplot"
  groupBy="condition"
  yAxis="expression"
  allowDownload={true}
/>

## 3. Multiple Testing Correction

When performing multiple statistical tests simultaneously, the probability of false positives increases. Several methods exist to control for this:

<MultipleTestingDemo
  methods={["bonferroni", "fdr_bh", "fdr_by"]}
  interactive={true}
/>

<CodeCell
  language="python"
  title="Correcting for Multiple Comparisons"
  allowExecution={true}
>
from statsmodels.stats.multitest import multipletests
import numpy as np

# Simulate p-values from multiple gene expression tests
np.random.seed(123)
n_genes = 1000
p_values = np.random.beta(0.5, 10, n_genes)  # Most p-values are small

# Apply different correction methods
methods = ['bonferroni', 'fdr_bh', 'fdr_by']
alpha = 0.05

results = {}
for method in methods:
    rejected, p_adjusted, _, _ = multipletests(p_values, alpha=alpha, method=method)
    results[method] = {
        'n_significant': sum(rejected),
        'p_adjusted': p_adjusted
    }

# Display results
print(f"Original significant tests (p < {alpha}): {sum(p_values < alpha)}")
for method, result in results.items():
    print(f"{method.upper()}: {result['n_significant']} significant after correction")
</CodeCell>
```

### Phase 3: Advanced Interactive Features (Week 4)

#### Interactive Parameter Exploration
```mdx
## Interactive Logistic Regression

Explore how different parameters affect the logistic regression decision boundary:

<ParameterExplorer
  title="Logistic Regression Classifier"
  formula="\sigma(z) = \frac{1}{1 + e^{-(w_0 + w_1x_1 + w_2x_2)}}"
  parameters={[
    {
      name: 'w0',
      label: 'Intercept (w₀)',
      min: -5,
      max: 5,
      step: 0.1,
      defaultValue: 0,
      description: 'Bias term that shifts the decision boundary'
    },
    {
      name: 'w1',
      label: 'Weight 1 (w₁)',
      min: -3,
      max: 3,
      step: 0.1,
      defaultValue: 1,
      description: 'Weight for first feature'
    },
    {
      name: 'w2',
      label: 'Weight 2 (w₂)',
      min: -3,
      max: 3,
      step: 0.1,
      defaultValue: 1,
      description: 'Weight for second feature'
    }
  ]}
  func={(params, x) => 1 / (1 + Math.exp(-(params.w0 + params.w1 * x + params.w2 * x)))}
  xRange={[-3, 3]}
  xLabel="Feature Value"
  yLabel="Probability"
/>

## Step-by-Step Gene Expression Analysis

<StepByStepTutorial
  title="RNA-seq Data Analysis Pipeline"
  steps={[
    {
      id: 'data-loading',
      title: 'Load and Inspect Data',
      description: 'Start by loading the RNA-seq count data and examining its structure',
      code: `
import pandas as pd
import numpy as np

# Load RNA-seq count matrix
counts = pd.read_csv('data/rnaseq_counts.csv', index_col=0)
print(f"Data shape: {counts.shape}")
print(f"First few genes:\\n{counts.head()}")
`,
      explanation: 'RNA-seq data is typically stored as a count matrix where rows represent genes and columns represent samples.',
      expectedOutput: 'Data shape: (20000, 24)\\nFirst few genes: ...',
      hints: [
        'Make sure your data file path is correct',
        'Check if the first column contains gene names',
        'Verify that counts are integers, not normalized values'
      ]
    },
    // ... more steps
  ]}
  onComplete={() => console.log('Tutorial completed!')}
/>
```

## 🔧 Migration Tools & Scripts

### Automated Image Optimization
```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const inputDir = 'migration/images';
  const outputDir = 'public/images';
  
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
    
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.[^.]+$/, '.webp'));
    
    await sharp(inputPath)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log(`Optimized ${file} -> ${path.basename(outputPath)}`);
  }
}

optimizeImages().catch(console.error);
```

### Content Validation
```typescript
// scripts/validate-content.ts
import { z } from 'zod';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const FrontmatterSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(300),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(['tutorial', 'research', 'review', 'project']),
  tags: z.array(z.string()).min(1).max(10),
  interactive: z.boolean().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  estimatedTime: z.string().optional(),
});

async function validateContent() {
  const contentDir = 'content/blog';
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
  
  let errors = 0;
  
  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter } = matter(content);
      
      FrontmatterSchema.parse(frontmatter);
      console.log(`✅ ${file} - Valid`);
    } catch (error) {
      console.error(`❌ ${file} - Invalid:`, error);
      errors++;
    }
  }
  
  console.log(`\nValidation complete: ${errors} errors found`);
  process.exit(errors > 0 ? 1 : 0);
}

validateContent();
```

## 📊 Migration Progress Tracking

### Migration Checklist

#### Content Migration Status
- [ ] **Bio/About Page** (Priority: High)
  - [ ] Professional information
  - [ ] Education details
  - [ ] Research interests
  - [ ] Contact information
  - [ ] Profile image optimization

- [ ] **Publications Section** (Priority: High)
  - [ ] Publication data structure
  - [ ] Citation metrics integration
  - [ ] DOI and link validation
  - [ ] Publication search/filter functionality
  - [ ] BibTeX export capability

- [ ] **Blog Posts** (Priority: High)
  - [ ] T-test tutorials (2 posts)
  - [ ] Statistical concepts guide (1 post)
  - [ ] BioNumpy tutorial (1 post)
  - [ ] AI agents article (1 post)
  - [ ] Jupyter demo (1 post)

- [ ] **Interactive Features** (Priority: Medium)
  - [ ] Code execution components
  - [ ] Parameter exploration widgets
  - [ ] Mathematical formula rendering
  - [ ] Data visualization components
  - [ ] Step-by-step tutorials

- [ ] **External Integrations** (Priority: Medium)
  - [ ] Google Colab links
  - [ ] Binder integration
  - [ ] GitHub repository connections
  - [ ] Social sharing functionality

### Quality Assurance Checklist

- [ ] **Content Quality**
  - [ ] All mathematical formulas render correctly
  - [ ] Code examples execute without errors
  - [ ] Interactive components function properly
  - [ ] Links and references are valid

- [ ] **SEO Optimization**
  - [ ] Meta descriptions for all pages
  - [ ] Structured data markup
  - [ ] Internal linking strategy
  - [ ] Image alt text optimization

- [ ] **Performance**
  - [ ] Images optimized (WebP format)
  - [ ] Code splitting implemented
  - [ ] Lazy loading configured
  - [ ] Core Web Vitals targets met

- [ ] **Accessibility**
  - [ ] Screen reader compatibility
  - [ ] Keyboard navigation support
  - [ ] Color contrast compliance
  - [ ] Alternative text for all images

## 🚀 Post-Migration Tasks

### URL Redirection Strategy
```javascript
// next.config.js redirects
const redirects = [
  {
    source: '/T-test-alt.html',
    destination: '/blog/t-test-applications',
    permanent: true,
  },
  {
    source: '/Top10_bioinfo_stats.html',
    destination: '/blog/statistical-concepts-bioinformatics',
    permanent: true,
  },
  {
    source: '/AI_agents_BioMed.html',
    destination: '/blog/ai-agents-biomedicine',
    permanent: true,
  },
  // ... more redirects
];
```

### Analytics Migration
```typescript
// Track migration success
export const trackMigration = () => {
  const migrationEvents = {
    'content_migrated': {
      event_category: 'migration',
      event_label: 'content_complete',
      value: 1,
    },
    'interactive_features_active': {
      event_category: 'features',
      event_label: 'interactive_ready',
      value: 1,
    },
  };

  Object.entries(migrationEvents).forEach(([event, params]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, params);
    }
  });
};
```

### Content Freshness Monitoring
```typescript
// Monitor content age and suggest updates
export interface ContentFreshnessCheck {
  path: string;
  lastModified: Date;
  recommendUpdate: boolean;
  reason?: string;
}

export function checkContentFreshness(): ContentFreshnessCheck[] {
  // Implementation to check content dates
  // and suggest updates based on:
  // - Publication dates of referenced papers
  // - Package version changes
  // - Method deprecation notices
  // - Community feedback
}
```

---

**Migration Timeline**: 4 weeks total
- **Week 1**: Static content and basic structure
- **Week 2**: Interactive notebook conversion  
- **Week 3**: Advanced interactive features
- **Week 4**: Testing, optimization, and launch

**Success Metrics**:
- All existing content successfully migrated
- Interactive features working properly
- Page load times < 3 seconds
- SEO rankings maintained or improved
- User engagement metrics increased