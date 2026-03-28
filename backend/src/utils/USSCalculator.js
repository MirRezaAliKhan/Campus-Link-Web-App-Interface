/**
 * USS (Universal Standard Score) Calculation Engine
 * Calculates composite score based on multiple factors with adjustable weights
 */

class USSCalculator {
  calculateAcademicsScore(cgpa) {
    // Normalize CGPA (0-10) to 0-100
    return (cgpa / 10) * 100;
  }

  calculateSkillsScore(skills, assessments) {
    if (!skills || skills.length === 0) return 0;

    let totalScore = 0;
    let weightedSum = 0;

    skills.forEach(skill => {
      const isVerified = skill.verified || (assessments && assessments.includes(skill.name));
      const weight = isVerified ? 1.2 : 1; // Verified skills get 20% boost

      totalScore += skill.proficiency * weight;
      weightedSum += 100 * weight;
    });

    return (totalScore / weightedSum) * 100;
  }

  calculateProjectsScore(projects) {
    if (!projects || projects.length === 0) return 0;

    let score = 0;
    const verifiedCount = projects.filter(p => p.verified).length;
    const avgVerificationPercentage = (verifiedCount / projects.length) * 100;

    // Base: average project quality (complexity of tech stack)
    const baseScore = Math.min(projects.length * 15, 70);

    // Verification bonus
    const verificationBonus = avgVerificationPercentage * 0.3;

    // GitHub/link verification bonus
    const linkBonus = projects.filter(p => p.githubLink || p.link).length * 5;

    score = Math.min(baseScore + verificationBonus + linkBonus, 100);
    return score;
  }

  calculateExperienceScore(internships) {
    if (!internships || internships.length === 0) return 30; // Base score if no internships

    let score = 30; // Base score
    const verifiedCount = internships.filter(i => i.verified).length;

    // Add points for each internship (max 40)
    const experienceBonus = Math.min(internships.length * 15, 40);

    // Verification bonus
    const verificationBonus = (verifiedCount / internships.length) * 20;

    score += experienceBonus + verificationBonus;
    return Math.min(score, 100);
  }

  calculateAchievementsScore(achievements) {
    if (!achievements || achievements.length === 0) return 0;

    let score = 0;
    const verifiedCount = achievements.filter(a => a.verified).length;

    // Base: points per achievement
    score = Math.min(achievements.length * 10, 50);

    // Verification bonus
    const verificationBonus = (verifiedCount / achievements.length) * 50;

    return Math.min(score + verificationBonus, 100);
  }

  calculateVerificationPercentage(profile) {
    let verifiedItems = 0;
    let totalItems = 0;

    // Skills
    if (profile.skills && profile.skills.length > 0) {
      const verifiedSkills = profile.skills.filter(s => s.verified).length;
      verifiedItems += verifiedSkills;
      totalItems += profile.skills.length;
    }

    // Projects
    if (profile.projects && profile.projects.length > 0) {
      const verifiedProjects = profile.projects.filter(p => p.verified).length;
      verifiedItems += verifiedProjects;
      totalItems += profile.projects.length;
    }

    // Internships
    if (profile.internships && profile.internships.length > 0) {
      const verifiedInternships = profile.internships.filter(i => i.verified).length;
      verifiedItems += verifiedInternships;
      totalItems += profile.internships.length;
    }

    // Achievements
    if (profile.achievements && profile.achievements.length > 0) {
      const verifiedAchievements = profile.achievements.filter(a => a.verified).length;
      verifiedItems += verifiedAchievements;
      totalItems += profile.achievements.length;
    }

    return totalItems > 0 ? (verifiedItems / totalItems) * 100 : 0;
  }

  calculateConfidence(verificationPercentage) {
    // Confidence is based on verification percentage
    // 0% verification = 30% confidence
    // 100% verification = 100% confidence
    return 30 + (verificationPercentage * 0.7);
  }

  calculateUSS(profile, weights = {}) {
    // Default weights if not provided
    const defaultWeights = {
      academics: 0.2,
      skills: 0.3,
      projects: 0.25,
      experience: 0.15,
      achievements: 0.1,
      verificationBonus: 0.05
    };

    const finalWeights = { ...defaultWeights, ...weights };

    // Normalize weights to sum to 1
    const weightsSum = Object.values(finalWeights).reduce((a, b) => a + b, 0);
    Object.keys(finalWeights).forEach(key => {
      finalWeights[key] = finalWeights[key] / weightsSum;
    });

    // Calculate individual scores
    const academicsScore = this.calculateAcademicsScore(profile.cgpa);
    const skillsScore = this.calculateSkillsScore(
      profile.skills,
      profile.assessments
    );
    const projectsScore = this.calculateProjectsScore(profile.projects);
    const experienceScore = this.calculateExperienceScore(profile.internships);
    const achievementsScore = this.calculateAchievementsScore(profile.achievements);

    // Calculate verification percentage
    const verificationPercentage = this.calculateVerificationPercentage(profile);
    const verificationBonus = (verificationPercentage / 100) * 10; // 0-10 bonus

    // Calculate USS
    const uss =
      (academicsScore * finalWeights.academics) +
      (skillsScore * finalWeights.skills) +
      (projectsScore * finalWeights.projects) +
      (experienceScore * finalWeights.experience) +
      (achievementsScore * finalWeights.achievements) +
      (verificationBonus * finalWeights.verificationBonus);

    const confidence = this.calculateConfidence(verificationPercentage);

    return {
      score: Math.min(Math.round(uss * 100) / 100, 100),
      confidence: Math.round(confidence),
      breakdown: {
        academicsScore: Math.round(academicsScore * 100) / 100,
        skillsScore: Math.round(skillsScore * 100) / 100,
        projectsScore: Math.round(projectsScore * 100) / 100,
        experienceScore: Math.round(experienceScore * 100) / 100,
        achievementsScore: Math.round(achievementsScore * 100) / 100
      },
      verificationPercentage: Math.round(verificationPercentage),
      verificationBonus: Math.round(verificationBonus * 100) / 100
    };
  }
}

module.exports = USSCalculator;
