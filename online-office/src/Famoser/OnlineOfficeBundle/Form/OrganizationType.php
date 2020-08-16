<?php

namespace Famoser\OnlineOfficeBundle\Form;

use Doctrine\ORM\EntityRepository;
use Famoser\OnlineOfficeBundle\Form\Base\BaseFormType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OrganizationType extends BaseFormType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $options = $this->parseOptionsArray($options);

        self::addFields($builder,
            array(
                "email" => EmailType::class,
                'telephone' => TextType::class,
                'name' => TextType::class,
                'legalName' => TextType::class,
                'description' => TextareaType::class
            ));

        if (isset($options["user"])) {
            self::addSpecialField($builder, "founder", EntityType::class, array(
                // query choices from this entity
                'class' => 'Famoser\OnlineOfficeBundle:Persons',
                'query_builder' => function (PersonRepository $er) use ($options) {
                    return $er->getPersonsOfUserQueryBuilder($options["user"]);
                },
                // use the User.username property as the visible option string
                'choice_label' => 'getFullName',
                'mapped' => false,
                "label" => "choose founder"
            ));
        }
        self::addSubmitButton($builder);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Famoser\OnlineOfficeBundle\Entity\Organizations',
            'user' => null,
        ));

        $resolver->setRequired('user'); // Requires that currentOrg be set by the caller.
        $resolver->setAllowedTypes('user', 'Famoser\OnlineOfficeBundle\Entity\Users'); // Validates the type(s) of
    }
}
